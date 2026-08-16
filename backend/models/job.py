from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, unique=True)
    industry = Column(String(100), default="Technology")
    logo_url = Column(String(500), nullable=True)
    website = Column(String(255), nullable=True)
    location = Column(String(150), default="San Francisco, CA")
    rating = Column(String(20), default="4.5")
    employee_count = Column(String(50), default="1000+")

    jobs = relationship("Job", back_populates="company")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    title = Column(String(200), nullable=False, index=True)
    location = Column(String(150), default="Remote")
    work_type = Column(String(50), default="Remote") # Remote, Hybrid, On-site
    employment_type = Column(String(50), default="Full-time")
    experience_level = Column(String(50), default="Mid-Level")
    salary_min = Column(Integer, default=90000)
    salary_max = Column(Integer, default=150000)
    currency = Column(String(10), default="USD")
    description = Column(Text, nullable=False)
    required_skills = Column(Text, nullable=False) # JSON array string
    optional_skills = Column(Text, nullable=True) # JSON array string
    apply_url = Column(String(500), nullable=True)
    posted_date = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

    company = relationship("Company", back_populates="jobs")
    saved_by_users = relationship("SavedJob", back_populates="job", cascade="all, delete-orphan")


class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    saved_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="saved_jobs")
    job = relationship("Job", back_populates="saved_by_users")
