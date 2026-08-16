from sqlalchemy.orm import Session

from models.skill import Skill


class SkillRepository:

    @staticmethod
    def create(
        db: Session,
        resume_id: int,
        skill_name: str,
        category: str,
    ):

        skill = Skill(
            resume_id=resume_id,
            skill_name=skill_name,
            category=category,
        )

        db.add(skill)
        db.commit()
        db.refresh(skill)

        return skill

    @staticmethod
    def get_resume_skills(
        db: Session,
        resume_id: int,
    ):

        return (
            db.query(Skill)
            .filter(Skill.resume_id == resume_id)
            .all()
        )

    @staticmethod
    def delete_resume_skills(
        db: Session,
        resume_id: int,
    ):

        (
            db.query(Skill)
            .filter(Skill.resume_id == resume_id)
            .delete()
        )

        db.commit()