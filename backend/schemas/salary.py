from pydantic import BaseModel
from typing import List, Optional


class SalaryPredictionRequest(BaseModel):
    role: str
    experience_years: int
    education_level: str  # Bachelor's, Master's, PhD
    location: str
    skills: List[str]


class SkillImpactItem(BaseModel):
    skill: str
    value_add: int
    demand_level: str


class SalaryPredictionResponse(BaseModel):
    predicted_salary: int
    salary_range_min: int
    salary_range_max: int
    median_salary: int
    currency: str = "USD"
    experience_impact: str
    education_impact: str
    location_impact: str
    top_value_skills: List[SkillImpactItem]
    career_progression_forecast: List[dict]
