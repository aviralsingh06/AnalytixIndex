from pydantic import BaseModel, Field


class SkillDemand(BaseModel):
    """
    Represents a skill and its demand.
    """

    skill: str = Field(
        ...,
        example="Python",
    )

    demand_percentage: float = Field(
        ...,
        ge=0,
        le=100,
        example=96.5,
    )

    job_count: int = Field(
        ...,
        ge=0,
        example=8,
    )


class CompanyHiring(BaseModel):
    """
    Represents a company's hiring activity.
    """

    company: str = Field(
        ...,
        example="Google",
    )

    openings: int = Field(
        ...,
        ge=0,
        example=124,
    )


class LocationDemand(BaseModel):
    """
    Represents hiring demand in a city.
    """

    location: str = Field(
        ...,
        example="Bangalore",
    )

    openings: int = Field(
        ...,
        ge=0,
        example=842,
    )


class SalaryInsight(BaseModel):
    """
    Average salary information.
    """

    role: str = Field(
        ...,
        example="Data Analyst",
    )

    average_salary: str = Field(
        ...,
        example="₹10 LPA",
    )


class MarketIntelligenceResponse(BaseModel):
    """
    Market Intelligence Dashboard Response.
    """

    total_jobs: int

    market_growth: str

    remote_jobs: int

    onsite_jobs: int

    hybrid_jobs: int

    top_skills: list[SkillDemand]

    top_companies: list[CompanyHiring]

    top_locations: list[LocationDemand]

    salary_insights: list[SalaryInsight]

    overall_average_salary: str | None = None