from fastapi import HTTPException
from sqlalchemy.orm import Session

from repositories.resume_repository import ResumeRepository
from repositories.skill_repository import SkillRepository

from services.skill_gap_service import SkillGapService

from utils.ats.scoring import ATSScorer


class ATSService:

    @staticmethod
    def analyze(
        db: Session,
        resume_id: int,
        target_role: str,
    ):

        # ----------------------------------
        # Fetch Resume
        # ----------------------------------

        resume = ResumeRepository.get_by_id(
            db=db,
            resume_id=resume_id,
        )

        if not resume:
            raise HTTPException(
                status_code=404,
                detail="Resume not found."
            )

        # ----------------------------------
        # Fetch Resume Skills
        # ----------------------------------

        skills = SkillRepository.get_resume_skills(
            db=db,
            resume_id=resume_id,
        )

        resume_skills = [
            skill.skill_name
            for skill in skills
        ]

        # ----------------------------------
        # Skill Gap Analysis
        # ----------------------------------

        skill_gap = SkillGapService.analyze(
            resume_skills=resume_skills,
            target_role=target_role,
        )

        # ----------------------------------
        # ATS Score
        # ----------------------------------

        ats = ATSScorer.calculate(

            resume_text=resume.parsed_text,

            matched_required=skill_gap["matched_required"],

            missing_required=skill_gap["missing_required"],

            matched_optional=skill_gap["matched_optional"],

            missing_optional=skill_gap["missing_optional"],

        )

        # ----------------------------------
        # Return Response
        # ----------------------------------

        return {

            "resume_id": resume.id,

            "target_role": target_role,

            "ats_score": ats["ats_score"],

            "grade": ats["grade"],

            "breakdown": ats["breakdown"],

            "sections": ats["sections"],

            "formatting": ats["formatting"],

            "skills": resume_skills,

            "skill_gap": skill_gap,

        }