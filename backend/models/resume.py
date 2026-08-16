from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=True)
    file_type = Column(String(50), default="pdf")
    file_size = Column(Integer, default=0)
    parsed_text = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    contact_info = Column(Text, nullable=True)  # JSON string
    education = Column(Text, nullable=True)     # JSON string
    experience = Column(Text, nullable=True)    # JSON string
    projects = Column(Text, nullable=True)      # JSON string
    certifications = Column(Text, nullable=True)# JSON string
    score = Column(Integer, default=70)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="resumes")
    skills = relationship("Skill", back_populates="resume", cascade="all, delete-orphan")
    ats_reports = relationship("ATSReport", back_populates="resume", cascade="all, delete-orphan")
    skill_gap_reports = relationship("SkillGapReport", back_populates="resume", cascade="all, delete-orphan")