from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.dependencies import get_db
import models
from schemas.auth import UserLogin, UserRegister, Token, PasswordReset, UserProfileUpdate, UserDetailResponse
from core.security import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=Token)
def register_user(payload: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email is already registered.")

    user = models.User(
        full_name=payload.full_name,
        email=payload.email,
        password=get_password_hash(payload.password),
        target_role=payload.target_role or "Data Scientist",
        experience_level=payload.experience_level or "Entry-Level",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    profile = models.Profile(
        user_id=user.id,
        target_role=user.target_role,
        bio=f"{payload.experience_level} candidate aiming for {payload.target_role} position.",
    )
    settings = models.UserSettings(user_id=user.id)
    db.add_all([profile, settings])
    db.commit()

    token = create_access_token(data={"sub": user.id, "email": user.email})
    return Token(access_token=token, token_type="bearer", user=UserDetailResponse.model_validate(user))


@router.post("/login", response_model=Token)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token(data={"sub": user.id, "email": user.email})
    return Token(access_token=token, token_type="bearer", user=UserDetailResponse.model_validate(user))


@router.get("/me", response_model=UserDetailResponse)
def get_me(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    res = UserDetailResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        role=current_user.role or "user",
        target_role=current_user.target_role or "Data Scientist",
        experience_level=current_user.experience_level or "Entry-Level",
        avatar_url=current_user.avatar_url,
        bio=profile.bio if profile else None,
        location=profile.location if profile else None,
        phone=profile.phone if profile else None,
        github_url=profile.github_url if profile else None,
        linkedin_url=profile.linkedin_url if profile else None,
        portfolio_url=profile.portfolio_url if profile else None,
        target_salary_min=profile.target_salary_min if profile else 80000,
        target_salary_max=profile.target_salary_max if profile else 140000,
    )
    return res


@router.put("/profile", response_model=UserDetailResponse)
def update_profile(payload: UserProfileUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if payload.full_name:
        current_user.full_name = payload.full_name
    if payload.target_role:
        current_user.target_role = payload.target_role

    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if not profile:
        profile = models.Profile(user_id=current_user.id)
        db.add(profile)

    for field, val in payload.model_dump(exclude_unset=True).items():
        if field in ["bio", "location", "phone", "github_url", "linkedin_url", "portfolio_url", "target_role", "preferred_location", "target_salary_min", "target_salary_max", "highest_degree"]:
            setattr(profile, field, val)

    db.commit()
    db.refresh(current_user)

    return UserDetailResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        role=current_user.role or "user",
        target_role=current_user.target_role or "Data Scientist",
        experience_level=current_user.experience_level or "Entry-Level",
        avatar_url=current_user.avatar_url,
        bio=profile.bio,
        location=profile.location,
        phone=profile.phone,
        github_url=profile.github_url,
        linkedin_url=profile.linkedin_url,
        portfolio_url=profile.portfolio_url,
        target_salary_min=profile.target_salary_min,
        target_salary_max=profile.target_salary_max,
    )


@router.post("/forgot-password")
def forgot_password(payload: PasswordReset, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User with provided email does not exist.")

    user.password = get_password_hash(payload.new_password)
    db.commit()
    return {"message": "Password updated successfully. You can now log in with your new password."}
