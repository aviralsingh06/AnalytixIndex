from pydantic import BaseModel


class LearningStep(BaseModel):
    skill: str
    priority: int
    difficulty: str
    estimated_weeks: int
    youtube: str
    course: str
    documentation: str


class RoadmapResponse(BaseModel):
    target_role: str
    total_missing_skills: int
    estimated_completion_weeks: int
    learning_plan: list[LearningStep]


class SkillGapRequest(BaseModel):
    resume_id: int
    target_role: str


class SkillGapResponse(BaseModel):
    target_role: str

    match_percentage: float

    required_total: int
    matched_required_count: int
    missing_required_count: int

    optional_total: int
    matched_optional_count: int
    missing_optional_count: int

    required_skills: list[str]

    matched_required: list[str]
    missing_required: list[str]

    matched_optional: list[str]
    missing_optional: list[str]

    roadmap: RoadmapResponse