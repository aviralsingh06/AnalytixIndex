from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.dependencies import get_db

from schemas.skill_gap import (
    SkillGapRequest,
    SkillGapResponse,
)

from repositories.resume_repository import ResumeRepository

from services.skill_gap_service import SkillGapService

router = APIRouter()


@router.post(
    "/",
    response_model=SkillGapResponse,
    summary="Analyze Skill Gap",
)
async def analyze_skill_gap(
    request: SkillGapRequest,
    db: Session = Depends(get_db),
):

    resume = ResumeRepository.get_by_id(
        db=db,
        resume_id=request.resume_id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    from utils.skill_extractor import SkillExtractor

    skills = SkillExtractor.extract(
        resume.parsed_text
    )

    resume_skills = [
        skill["skill_name"]
        for skill in skills
    ]

    return SkillGapService.analyze(
        resume_skills=resume_skills,
        target_role=request.target_role,
    )