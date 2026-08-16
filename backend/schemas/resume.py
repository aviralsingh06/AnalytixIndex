from datetime import datetime

from pydantic import BaseModel


class SkillResponse(BaseModel):
    skill_name: str
    category: str


class ResumeResponse(BaseModel):
    id: int
    user_id: int
    file_name: str
    parsed_text: str | None
    upload_date: datetime

    skills_found: int
    skills: list[SkillResponse]

    # NEW
    ats_score: int
    missing_skills: list[str]
    summary: str
    recommendations: list[str]

    model_config = {
        "from_attributes": True
    }