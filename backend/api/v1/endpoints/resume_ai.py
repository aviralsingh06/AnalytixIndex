from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db

from schemas.resume_ai import (
    ResumeAIRequest,
    ResumeAIResponse,
)

from services.resume_ai_service import ResumeAIService

router = APIRouter()


@router.post(
    "/resume-ai",
    response_model=ResumeAIResponse,
    summary="AI Resume Analysis",
)
def analyze_resume(

    request: ResumeAIRequest,

    db: Session = Depends(get_db),

):

    return ResumeAIService.analyze(

        db=db,

        resume_id=request.resume_id,

        target_role=request.target_role,

    )