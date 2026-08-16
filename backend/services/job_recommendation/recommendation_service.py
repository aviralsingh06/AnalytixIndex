from fastapi import HTTPException
from sqlalchemy.orm import Session

from repositories.resume_repository import ResumeRepository
from repositories.skill_repository import SkillRepository

from services.job_recommendation.matcher import JobMatcher
from services.job_recommendation.salary_estimator import SalaryEstimator


class JobRecommendationService:

    @staticmethod
    def recommend(
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

        if resume is None:

            raise HTTPException(
                status_code=404,
                detail="Resume not found.",
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
        # Match Jobs
        # ----------------------------------

        recommendations = JobMatcher.recommend(
            resume_skills=resume_skills,
            target_role=target_role,
        )

        # ----------------------------------
        # Salary Estimation
        # ----------------------------------

        final_jobs = []

        for job in recommendations:

            salary = SalaryEstimator.estimate(
                salary_range=job["salary"],
                match_percentage=job["match_percentage"],
            )

            final_jobs.append(

                {

                    "title": job["title"],

                    "company": job["company"],

                    "location": job["location"],

                    "employment_type": job["employment_type"],

                    "experience": job["experience"],

                    "salary": salary["salary_range"],

                    "match_percentage": job["match_percentage"],

                    "matched_skills": job["matched_skills"],

                    "missing_skills": job["missing_skills"],

                }

            )

        # ----------------------------------
        # Response
        # ----------------------------------

        return {

            "resume_id": resume_id,

            "target_role": target_role,

            "total_recommendations": len(final_jobs),

            "recommended_jobs": final_jobs,

        }