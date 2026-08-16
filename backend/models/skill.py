from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False)
    skill_name = Column(String(100), nullable=False, index=True)
    category = Column(String(100), nullable=False, default="Technical")
    proficiency = Column(String(50), default="Intermediate")

    resume = relationship("Resume", back_populates="skills")