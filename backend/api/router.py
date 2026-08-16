from fastapi import APIRouter

from api.v1.endpoints.health import router as health_router
from api.v1.endpoints.auth import router as auth_router
from api.v1.endpoints.users import router as users_router
from api.v1.endpoints.resumes import router as resumes_router
from api.v1.endpoints.skill_gap import router as skill_gap_router
from api.v1.endpoints.ats import router as ats_router
from api.v1.endpoints.resume_ai import router as resume_ai_router
from api.v1.endpoints.career_coach import router as career_coach_router
from api.v1.endpoints.job_recommendation import router as job_recommendation_router
from api.v1.endpoints.market_intelligence import router as market_intelligence_router
from api.v1.endpoints.salary import router as salary_router
from api.v1.endpoints.dashboard import router as dashboard_router
from api.v1.endpoints.settings import router as settings_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["Health"])
api_router.include_router(auth_router, tags=["Auth"])
api_router.include_router(users_router, tags=["Users"])
api_router.include_router(resumes_router, tags=["Resumes"])
api_router.include_router(skill_gap_router, prefix="/skill-gap",tags=["Skill Gap"])
api_router.include_router(ats_router, tags=["ATS"])
api_router.include_router(resume_ai_router, tags=["Resume AI"])
api_router.include_router(career_coach_router, tags=["Career Coach"])
api_router.include_router(job_recommendation_router, tags=["Job Recommendation"])
api_router.include_router(market_intelligence_router, tags=["Market Intelligence"])
api_router.include_router(salary_router, tags=["Salary Prediction"])
api_router.include_router(dashboard_router, tags=["Dashboard"])
api_router.include_router(settings_router, tags=["Settings"])