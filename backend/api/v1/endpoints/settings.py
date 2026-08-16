from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from db.dependencies import get_db
import models
from core.security import get_current_user, get_password_hash, verify_password

router = APIRouter(prefix="/settings", tags=["Settings"])


class UpdateSettingsSchema(BaseModel):
    theme: str = "dark"
    email_notifications: str = "true"
    job_alerts: str = "true"
    market_digest: str = "weekly"
    privacy_mode: str = "private"


class ChangePasswordSchema(BaseModel):
    old_password: str
    new_password: str


@router.get("/")
def get_user_settings(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    user_setting = db.query(models.UserSettings).filter(models.UserSettings.user_id == current_user.id).first()
    if not user_setting:
        user_setting = models.UserSettings(user_id=current_user.id)
        db.add(user_setting)
        db.commit()
        db.refresh(user_setting)

    return {
        "theme": user_setting.theme,
        "email_notifications": user_setting.email_notifications,
        "job_alerts": user_setting.job_alerts,
        "market_digest": user_setting.market_digest,
        "privacy_mode": user_setting.privacy_mode,
    }


@router.put("/")
def update_user_settings(payload: UpdateSettingsSchema, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    user_setting = db.query(models.UserSettings).filter(models.UserSettings.user_id == current_user.id).first()
    if not user_setting:
        user_setting = models.UserSettings(user_id=current_user.id)
        db.add(user_setting)

    user_setting.theme = payload.theme
    user_setting.email_notifications = payload.email_notifications
    user_setting.job_alerts = payload.job_alerts
    user_setting.market_digest = payload.market_digest
    user_setting.privacy_mode = payload.privacy_mode

    db.commit()
    return {"message": "Settings updated successfully"}


@router.post("/change-password")
def change_password(payload: ChangePasswordSchema, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not verify_password(payload.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Incorrect existing password")

    current_user.password = get_password_hash(payload.new_password)
    db.commit()
    return {"message": "Password changed successfully"}


@router.post("/export-data")
def export_user_data(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    resumes = db.query(models.Resume).filter(models.Resume.user_id == current_user.id).all()
    saved_jobs = db.query(models.SavedJob).filter(models.SavedJob.user_id == current_user.id).all()

    return {
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "role": current_user.role,
            "target_role": current_user.target_role,
        },
        "profile": {
            "bio": profile.bio if profile else None,
            "location": profile.location if profile else None,
        },
        "resumes_count": len(resumes),
        "saved_jobs_count": len(saved_jobs),
        "exported_at": "2026-08-06",
    }


@router.delete("/delete-account")
def delete_account(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db.delete(current_user)
    db.commit()
    return {"message": "Account deleted successfully"}
