import os
import fitz

from fastapi import UploadFile
from sqlalchemy.orm import Session

from repositories.resume_repository import ResumeRepository
from repositories.skill_repository import SkillRepository

from utils.skill_extractor import SkillExtractor

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class ResumeService:

    @staticmethod
    async def upload_resume(
        db: Session,
        user_id: int,
        file: UploadFile,
    ):

        # --------------------------
        # Save uploaded file
        # --------------------------

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # --------------------------
        # Read PDF
        # --------------------------

        doc = fitz.open(file_path)

        parsed_text = ""

        for page in doc:
            parsed_text += page.get_text()

        doc.close()

        # --------------------------
        # Save Resume
        # --------------------------

        resume = ResumeRepository.create(
            db=db,
            user_id=user_id,
            file_name=file.filename,
            parsed_text=parsed_text,
        )

        # --------------------------
        # Extract Skills
        # --------------------------

        skills = SkillExtractor.extract(parsed_text)

        # --------------------------
        # Save Skills
        # --------------------------

        for skill in skills:

            SkillRepository.create(
                db=db,
                resume_id=resume.id,
                skill_name=skill["skill_name"],
                category=skill["category"],
            )

        # --------------------------
        # ATS Score
        # --------------------------

        ats_score = min(
            100,
            50 + len(skills) * 2,
        )

        # --------------------------
        # Missing Skills
        # --------------------------

        common_skills = {
            "Python",
            "SQL",
            "Excel",
            "Power BI",
            "Tableau",
            "AWS",
            "Docker",
            "Git",
            "Machine Learning",
            "Pandas",
            "NumPy",
            "Statistics",
            "Apache Spark",
            "Airflow",
        }

        found_skill_names = {
            skill["skill_name"]
            for skill in skills
        }

        missing_skills = sorted(
            list(common_skills - found_skill_names)
        )

        # --------------------------
        # AI Summary
        # --------------------------

        summary = (
            f"Your resume contains {len(skills)} technical skills. "
            f"It achieved an ATS score of {ats_score}/100. "
            "The resume has a solid technical foundation, "
            "but adding the missing skills and more quantified "
            "achievements will improve your chances of getting "
            "shortlisted for Data Analyst and Data Scientist roles."
        )

        # --------------------------
        # Recommendations
        # --------------------------

        recommendations = [
            "Add quantified achievements.",
            "Include cloud technologies like AWS.",
            "Mention Docker if you have practical experience.",
            "Improve ATS keyword coverage.",
        ]

        # --------------------------
        # Return Response
        # --------------------------

        return {
            "id": resume.id,
            "user_id": resume.user_id,
            "file_name": resume.file_name,
            "parsed_text": resume.parsed_text,
            "upload_date": resume.upload_date,

            "skills_found": len(skills),
            "skills": skills,

            "ats_score": ats_score,
            "missing_skills": missing_skills,
            "summary": summary,
            "recommendations": recommendations,
        }