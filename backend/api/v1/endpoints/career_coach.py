from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db
from schemas.career_coach.request import CareerCoachRequest
from schemas.career_coach.response import CareerCoachResponse
from services.career_coach.career_coach_service import CareerCoachService
from services.interview_service import InterviewService

router = APIRouter(prefix="/career-coach")


@router.post(
    "/",
    response_model=CareerCoachResponse,
    summary="AI Career Coach",
)
def analyze_career(
    request: CareerCoachRequest,
    db: Session = Depends(get_db),
):
    return CareerCoachService.analyze(
        db=db,
        resume_id=request.resume_id,
        target_role=request.target_role,
    )


@router.get(
    "/interview-prep",
    summary="Get Interview Preparation Questions",
)
def get_interview_prep(role: str = "Data Scientist"):
    return {
        "role": role,
        "categories": InterviewService.get_questions(role),
    }