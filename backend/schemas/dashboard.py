from pydantic import BaseModel
from typing import List, Optional


class StatCard(BaseModel):
    title: str
    value: str
    change: str
    is_positive: bool
    icon: str


class TrendingSkill(BaseModel):
    name: str
    growth: str
    category: str


class DashboardOverview(BaseModel):
    user_name: str
    target_role: str
    career_readiness_score: int
    ats_score: int
    skill_match_score: int
    resumes_count: int
    saved_jobs_count: int
    stats: List[StatCard]
    trending_skills: List[TrendingSkill]
    recent_activity: List[dict]
    personalized_recommendations: List[dict]
    market_highlights: dict
