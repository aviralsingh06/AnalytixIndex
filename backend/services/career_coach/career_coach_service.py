from fastapi import HTTPException
from sqlalchemy.orm import Session

from repositories.resume_repository import ResumeRepository
from repositories.skill_repository import SkillRepository

from services.skill_gap_service import SkillGapService

from utils.ats.scoring import ATSScorer

from services.career_coach.recommendation_engine import RecommendationEngine
from services.career_coach.prompt_builder import PromptBuilder
from services.career_coach.response_formatter import ResponseFormatter


class CareerCoachService:

    @staticmethod
    def analyze(
        db: Session,
        resume_id: int,
        target_role: str,
    ):

        # ------------------------------------
        # Fetch Resume
        # ------------------------------------

        resume = ResumeRepository.get_by_id(
            db=db,
            resume_id=resume_id,
        )

        if resume is None:

            raise HTTPException(
                status_code=404,
                detail="Resume not found.",
            )

        # ------------------------------------
        # Fetch Resume Skills
        # ------------------------------------

        skills = SkillRepository.get_resume_skills(
            db=db,
            resume_id=resume_id,
        )

        resume_skills = [
            skill.skill_name
            for skill in skills
        ]

        # ------------------------------------
        # Skill Gap Analysis
        # ------------------------------------

        skill_gap = SkillGapService.analyze(
            resume_skills=resume_skills,
            target_role=target_role,
        )

        # ------------------------------------
        # ATS Analysis
        # ------------------------------------

        ats = ATSScorer.calculate(

            resume_text=resume.parsed_text,

            matched_required=skill_gap["matched_required"],

            missing_required=skill_gap["missing_required"],

            matched_optional=skill_gap["matched_optional"],

            missing_optional=skill_gap["missing_optional"],

        )

        # ------------------------------------
        # Recommendation Engine
        # ------------------------------------

        recommendations = RecommendationEngine.generate(

            target_role=target_role,

            missing_skills=skill_gap["missing_required"],

        )

        # ------------------------------------
        # AI Prompt
        # ------------------------------------

        prompt = PromptBuilder.build(

            target_role=target_role,

            ats_score=ats["ats_score"],

            matched_skills=skill_gap["matched_required"],

            missing_skills=skill_gap["missing_required"],

        )

        # ------------------------------------
        # Final Response
        # ------------------------------------

        response = ResponseFormatter.format(

            resume_id=resume_id,

            target_role=target_role,

            recommendations=recommendations,

        )

        # Attach additional information

        response["ats_score"] = ats["ats_score"]

        response["grade"] = ats["grade"]

        response["matched_skills"] = skill_gap["matched_required"]

        response["missing_skills"] = skill_gap["missing_required"]

        response["prompt"] = prompt

        return response