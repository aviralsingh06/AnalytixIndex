from pydantic import BaseModel


# ---------------- ATS ----------------

class ATSBreakdown(BaseModel):

    required_skills: float
    optional_skills: float
    sections: float
    formatting: float


class ATSFormatting(BaseModel):

    email: bool
    phone: bool
    linkedin: bool
    github: bool
    portfolio: bool

    word_count: int
    length_score: float
    formatting_score: float


class ATSAnalysis(BaseModel):

    ats_score: float

    grade: str

    breakdown: ATSBreakdown

    sections: dict

    formatting: ATSFormatting


# ---------------- Keyword ----------------

class KeywordAnalysisResponse(BaseModel):

    target_role: str

    keyword_score: float

    ats_keywords: list[str]

    matched_keywords: list[str]

    missing_keywords: list[str]

    required_missing: list[str]

    optional_missing: list[str]


# ---------------- Feedback ----------------

class ResumeFeedbackResponse(BaseModel):

    overall_feedback: str

    strengths: list[str]

    weaknesses: list[str]

    recommendations: list[str]


# ---------------- Bullet ----------------

class BulletImprovement(BaseModel):

    original: str

    improved: str


# ---------------- Request ----------------

class ResumeAIRequest(BaseModel):

    resume_id: int

    target_role: str


# ---------------- Response ----------------

class ResumeAIResponse(BaseModel):

    resume_id: int

    target_role: str

    ats: ATSAnalysis

    skill_gap: dict

    keyword_analysis: KeywordAnalysisResponse

    resume_feedback: ResumeFeedbackResponse

    bullet_improvements: list[BulletImprovement]