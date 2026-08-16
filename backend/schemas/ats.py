from pydantic import BaseModel


class ATSBreakdown(BaseModel):
    required_skills: float
    optional_skills: float
    sections: float
    formatting: float


class ResumeSectionsResponse(BaseModel):
    summary: bool
    skills: bool
    projects: bool
    experience: bool
    education: bool
    certifications: bool
    achievements: bool
    languages: bool
    contact: bool


class ResumeFormattingResponse(BaseModel):
    email: bool
    phone: bool
    linkedin: bool
    github: bool
    portfolio: bool

    word_count: int
    length_score: int

    formatting_score: int


class ATSResponse(BaseModel):

    resume_id: int

    target_role: str

    ats_score: float

    grade: str

    breakdown: ATSBreakdown

    sections: ResumeSectionsResponse

    formatting: ResumeFormattingResponse

    skills: list[str]

    skill_gap: dict