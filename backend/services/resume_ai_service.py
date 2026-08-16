from fastapi import HTTPException
from sqlalchemy.orm import Session

from repositories.resume_repository import ResumeRepository
from repositories.skill_repository import SkillRepository

from services.skill_gap_service import SkillGapService

from utils.ats.scoring import ATSScorer
from utils.resume_ai.keyword_optimizer import KeywordOptimizer
from utils.resume_ai.resume_feedback import ResumeFeedback
from utils.resume_ai.bullet_improver import BulletImprover


class ResumeAIService:

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
        # Resume Skills
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
        # Skill Gap
        # ----------------------------------

        skill_gap = SkillGapService.analyze(
            resume_skills=resume_skills,
            target_role=target_role,
        )

        # ----------------------------------
        # ATS Analysis
        # ----------------------------------

        ats = ATSScorer.calculate(

            resume_text=resume.parsed_text,

            matched_required=skill_gap["matched_required"],

            missing_required=skill_gap["missing_required"],

            matched_optional=skill_gap["matched_optional"],

            missing_optional=skill_gap["missing_optional"],

        )

        # ----------------------------------
        # Keyword Optimization
        # ----------------------------------

        keywords = KeywordOptimizer.optimize(
            resume_skills=resume_skills,
            target_role=target_role,
        )

        # ----------------------------------
        # Resume Feedback
        # ----------------------------------

        feedback = ResumeFeedback.generate(

            ats_score=ats["ats_score"],

            skill_gap=skill_gap,

            formatting=ats["formatting"],

            sections=ats["sections"],

        )

        # ----------------------------------
        # Bullet Improvement
        # ----------------------------------

        bullets = BulletImprover.improve(
            resume.parsed_text
        )

        # ----------------------------------
        # Return
        # ----------------------------------

        return {

            "resume_id": resume.id,

            "target_role": target_role,

            "ats": ats,

            "skill_gap": skill_gap,

            "keyword_analysis": keywords,

            "resume_feedback": feedback,

            "bullet_improvements": bullets,

        }