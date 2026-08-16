from pydantic import BaseModel, Field


class JobRecommendation(BaseModel):
    """
    Represents a single recommended job.
    """

    title: str = Field(
        ...,
        description="Job title.",
        example="Junior Data Analyst",
    )

    company: str = Field(
        ...,
        description="Company name.",
        example="Google",
    )

    location: str = Field(
        ...,
        description="Job location.",
        example="Bangalore",
    )

    employment_type: str = Field(
        ...,
        description="Employment type.",
        example="Full-Time",
    )

    experience: str = Field(
        ...,
        description="Required experience.",
        example="0-2 Years",
    )

    salary: str = Field(
        ...,
        description="Estimated salary range.",
        example="₹6 LPA - ₹10 LPA",
    )

    match_percentage: float = Field(
        ...,
        ge=0,
        le=100,
        description="Skill match percentage.",
        example=92.5,
    )

    matched_skills: list[str] = Field(
        default_factory=list,
        description="Skills matched with the job.",
    )

    missing_skills: list[str] = Field(
        default_factory=list,
        description="Skills missing for this job.",
    )


class JobRecommendationResponse(BaseModel):
    """
    Response returned by the Job Recommendation Engine.
    """

    resume_id: int

    target_role: str

    total_recommendations: int

    recommended_jobs: list[JobRecommendation]