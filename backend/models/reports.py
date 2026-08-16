from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class ATSReport(Base):
    __tablename__ = "ats_reports"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False)
    target_role = Column(String(100), default="Data Scientist")
    overall_score = Column(Integer, default=75)
    formatting_score = Column(Integer, default=80)
    keyword_score = Column(Integer, default=70)
    skills_score = Column(Integer, default=75)
    education_score = Column(Integer, default=85)
    experience_score = Column(Integer, default=70)
    contact_score = Column(Integer, default=90)
    report_data = Column(Text, nullable=False) # JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    resume = relationship("Resume", back_populates="ats_reports")


class SkillGapReport(Base):
    __tablename__ = "skill_gap_reports"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False)
    target_role = Column(String(100), nullable=False)
    match_percentage = Column(Integer, default=65)
    existing_skills = Column(Text, nullable=False) # JSON
    missing_skills = Column(Text, nullable=False)  # JSON
    recommendations = Column(Text, nullable=False) # JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    resume = relationship("Resume", back_populates="skill_gap_reports")


class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action_type = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="activities")


class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    theme = Column(String(20), default="dark")
    email_notifications = Column(String(10), default="true")
    job_alerts = Column(String(10), default="true")
    market_digest = Column(String(10), default="weekly")
    privacy_mode = Column(String(20), default="private")

    user = relationship("User", back_populates="settings")
