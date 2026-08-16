from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CompanyResponse(BaseModel):
    id: int
    name: str
    industry: str
    logo_url: Optional[str] = None
    website: Optional[str] = None
    location: str
    rating: str
    employee_count: str

    class Config:
        from_attributes = True


class JobResponse(BaseModel):
    id: int
    company_id: int
    company: CompanyResponse
    title: str
    location: str
    work_type: str
    employment_type: str
    experience_level: str
    salary_min: int
    salary_max: int
    currency: str
    description: str
    required_skills: List[str]
    optional_skills: List[str]
    match_percentage: Optional[int] = 85
    apply_url: Optional[str] = None
    is_saved: Optional[bool] = False
    posted_date: datetime

    class Config:
        from_attributes = True


class JobFilter(BaseModel):
    target_role: Optional[str] = None
    work_type: Optional[str] = None  # Remote, Hybrid, On-site
    experience_level: Optional[str] = None
    min_salary: Optional[int] = None
    search: Optional[str] = None
