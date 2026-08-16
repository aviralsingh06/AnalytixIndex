import json
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.dependencies import get_db
import models
from core.security import get_current_user
from schemas.job_recommendation.request import JobRecommendationRequest
from schemas.job_recommendation.response import JobRecommendationResponse
from services.job_recommendation.recommendation_service import JobRecommendationService

router = APIRouter(prefix="/job-recommendation")


@router.post(
    "",
    response_model=JobRecommendationResponse,
    summary="Job Recommendation Engine",
)
def recommend_jobs(
    request: JobRecommendationRequest,
    db: Session = Depends(get_db),
):
    return JobRecommendationService.recommend(
        db=db,
        resume_id=request.resume_id,
        target_role=request.target_role,
    )


@router.get("/jobs", summary="Get all job postings with filtering")
def get_jobs(
    target_role: Optional[str] = None,
    work_type: Optional[str] = None,
    experience_level: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    query = db.query(models.Job)
    if target_role:
        query = query.filter(models.Job.title.ilike(f"%{target_role}%"))
    if work_type:
        query = query.filter(models.Job.work_type == work_type)
    if experience_level:
        query = query.filter(models.Job.experience_level == experience_level)

    jobs = query.all()
    saved_job_ids = {sj.job_id for sj in db.query(models.SavedJob).filter(models.SavedJob.user_id == current_user.id).all()}

    results = []
    for j in jobs:
        company = db.query(models.Company).filter(models.Company.id == j.company_id).first()
        req_skills = json.loads(j.required_skills) if j.required_skills else []
        opt_skills = json.loads(j.optional_skills) if j.optional_skills else []
        
        results.append({
            "id": j.id,
            "title": j.title,
            "company_name": company.name if company else "Tech Firm",
            "company_logo": company.logo_url if company else None,
            "company_rating": company.rating if company else "4.5",
            "location": j.location,
            "work_type": j.work_type,
            "employment_type": j.employment_type,
            "experience_level": j.experience_level,
            "salary_min": j.salary_min,
            "salary_max": j.salary_max,
            "currency": j.currency,
            "description": j.description,
            "required_skills": req_skills,
            "optional_skills": opt_skills,
            "match_percentage": 88,
            "apply_url": j.apply_url,
            "is_saved": j.id in saved_job_ids,
            "posted_date": j.posted_date.strftime("%Y-%m-%d") if j.posted_date else "Recently",
        })
    return results


@router.post("/jobs/save/{job_id}", summary="Save or Bookmark a Job")
def toggle_save_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    existing = db.query(models.SavedJob).filter(
        models.SavedJob.user_id == current_user.id,
        models.SavedJob.job_id == job_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"saved": False, "message": "Job removed from saved bookmarks"}
    else:
        new_save = models.SavedJob(user_id=current_user.id, job_id=job_id)
        db.add(new_save)
        db.commit()
        return {"saved": True, "message": "Job bookmarked successfully"}


@router.get("/jobs/saved", summary="Get User Saved Jobs")
def get_saved_jobs(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    saved_items = db.query(models.SavedJob).filter(models.SavedJob.user_id == current_user.id).all()
    results = []
    for sj in saved_items:
        j = sj.job
        company = j.company
        results.append({
            "id": j.id,
            "title": j.title,
            "company_name": company.name if company else "Tech Firm",
            "location": j.location,
            "work_type": j.work_type,
            "salary_min": j.salary_min,
            "salary_max": j.salary_max,
            "required_skills": json.loads(j.required_skills) if j.required_skills else [],
            "apply_url": j.apply_url,
            "saved_at": sj.saved_at,
        })
    return results