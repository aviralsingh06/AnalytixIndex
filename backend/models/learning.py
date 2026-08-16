from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    provider = Column(String(100), default="Coursera") # Coursera, Udemy, YouTube, edX
    skill_category = Column(String(100), nullable=False) # Python, SQL, Machine Learning, etc.
    type = Column(String(50), default="Course") # Course, Book, Documentation, YouTube, Competition
    difficulty = Column(String(50), default="Intermediate")
    duration = Column(String(50), default="10 hours")
    rating = Column(String(20), default="4.8")
    url = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)

    saved_by_users = relationship("SavedCourse", back_populates="course", cascade="all, delete-orphan")


class SavedCourse(Base):
    __tablename__ = "saved_courses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    saved_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="saved_courses")
    course = relationship("Course", back_populates="saved_by_users")


class LearningRoadmap(Base):
    __tablename__ = "learning_roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_role = Column(String(100), nullable=False)
    readiness_score = Column(Integer, default=65)
    roadmap_data = Column(Text, nullable=False) # JSON object string
    created_at = Column(DateTime(timezone=True), server_default=func.now())
