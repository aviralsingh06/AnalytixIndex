from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db

from schemas.ats import ATSResponse
from schemas.skill_gap import SkillGapRequest

from services.ats_service import ATSService

router = APIRouter()


@router.post(
    "/ats-score",
    response_model=ATSResponse,
    summary="Analyze ATS Resume Score",
)
def analyze_resume(
    request: SkillGapRequest,
    db: Session = Depends(get_db),
):

    return ATSService.analyze(
        db=db,
        resume_id=request.resume_id,
        target_role=request.target_role,
    )