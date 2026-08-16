from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.dependencies import get_db
import models
from schemas.dashboard import DashboardOverview, StatCard, TrendingSkill
from core.security import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/overview", response_model=DashboardOverview)
def get_dashboard_overview(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    resumes_count = db.query(models.Resume).filter(models.Resume.user_id == current_user.id).count()
    saved_jobs_count = db.query(models.SavedJob).filter(models.SavedJob.user_id == current_user.id).count()
    latest_resume = db.query(models.Resume).filter(models.Resume.user_id == current_user.id).order_by(models.Resume.upload_date.desc()).first()

    ats_score = latest_resume.score if latest_resume else 78
    readiness_score = min(100, ats_score + 6)
    skill_match = 82

    stats = [
        StatCard(title="Career Readiness Score", value=f"{readiness_score}%", change="+4% this week", is_positive=True, icon="Target"),
        StatCard(title="ATS Score", value=f"{ats_score}/100", change="+8 pts vs avg", is_positive=True, icon="Award"),
        StatCard(title="Target Role Skill Match", value=f"{skill_match}%", change="+12% match", is_positive=True, icon="Zap"),
        StatCard(title="Saved Job Listings", value=str(saved_jobs_count), change="Active Applications", is_positive=True, icon="Briefcase"),
    ]

    trending_skills = [
        TrendingSkill(name="PyTorch & Transformers", growth="+34% MoM", category="Deep Learning"),
        TrendingSkill(name="SQL & dbt Transformation", growth="+28% MoM", category="Data Engineering"),
        TrendingSkill(name="Snowflake Data Cloud", growth="+22% MoM", category="Cloud Data Warehousing"),
        TrendingSkill(name="Docker & MLflow MLOps", growth="+19% MoM", category="Infrastructure"),
    ]

    activities = [
        {"action": "Uploaded Resume", "details": "Data_Scientist_Resume_2026.pdf", "time": "2 hours ago"},
        {"action": "Ran ATS Analyzer", "details": "Achieved 84% score for Data Scientist role", "time": "Yesterday"},
        {"action": "Generated Learning Roadmap", "details": "Target role: Senior ML Engineer", "time": "3 days ago"},
    ]

    recommendations = [
        {"type": "Course", "title": "Deep Learning with PyTorch Specialization", "provider": "Coursera", "reason": "Fills PyTorch gap for ML Engineer role"},
        {"type": "Project", "title": "End-to-End LLM Fine-Tuning Pipeline", "difficulty": "Advanced", "reason": "Highly demanded by SF Tech employers"},
        {"type": "Certification", "title": "AWS Certified Machine Learning Specialist", "reason": "Boosts ATS score by +15%"},
    ]

    market_highlights = {
        "most_demanded_role": "Machine Learning Engineer",
        "avg_data_science_salary": "$135,000",
        "remote_job_ratio": "42%",
        "top_growing_city": "San Francisco, CA & Remote",
    }

    return DashboardOverview(
        user_name=current_user.full_name,
        target_role=current_user.target_role or "Data Scientist",
        career_readiness_score=readiness_score,
        ats_score=ats_score,
        skill_match_score=skill_match,
        resumes_count=resumes_count,
        saved_jobs_count=saved_jobs_count,
        stats=stats,
        trending_skills=trending_skills,
        recent_activity=activities,
        personalized_recommendations=recommendations,
        market_highlights=market_highlights,
    )
