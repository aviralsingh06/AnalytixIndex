from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    bio = Column(Text, nullable=True)
    location = Column(String(150), nullable=True)
    phone = Column(String(50), nullable=True)
    github_url = Column(String(255), nullable=True)
    linkedin_url = Column(String(255), nullable=True)
    portfolio_url = Column(String(255), nullable=True)
    target_role = Column(String(100), default="Data Scientist")
    preferred_location = Column(String(150), default="Remote")
    target_salary_min = Column(Integer, default=80000)
    target_salary_max = Column(Integer, default=140000)
    highest_degree = Column(String(100), default="Bachelor's")
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="profile")
