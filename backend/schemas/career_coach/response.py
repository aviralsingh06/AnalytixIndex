from pydantic import BaseModel, Field


class CareerCoachResponse(BaseModel):

    resume_id: int = Field(
        ...,
        description="Resume ID.",
        example=5,
    )

    target_role: str = Field(
        ...,
        description="Target job role.",
        example="Data Analyst",
    )

    career_summary: str = Field(
        ...,
        description="Overall career guidance summary.",
        example="You already have a strong Python foundation. Focus on Power BI, Tableau and Statistics to become job ready.",
    )

    strengths: list[str] = Field(
        default_factory=list,
        description="Strong skills already present in the resume.",
        example=[
            "Python",
            "SQL",
            "Pandas",
            "Excel",
        ],
    )

    weaknesses: list[str] = Field(
        default_factory=list,
        description="Missing required skills.",
        example=[
            "Power BI",
            "Statistics",
            "Tableau",
        ],
    )

    priority_skills: list[str] = Field(
        default_factory=list,
        description="Skills that should be learned first.",
        example=[
            "Power BI",
            "Statistics",
            "Tableau",
        ],
    )

    recommended_projects: list[str] = Field(
        default_factory=list,
        description="Portfolio projects to build.",
        example=[
            "Sales Dashboard",
            "Customer Churn Analysis",
            "HR Analytics Dashboard",
        ],
    )

    interview_questions: list[str] = Field(
        default_factory=list,
        description="Suggested interview questions.",
        example=[
            "Explain SQL JOIN types.",
            "Difference between NumPy and Pandas.",
            "Explain Central Limit Theorem.",
        ],
    )

    learning_resources: list[str] = Field(
        default_factory=list,
        description="Recommended learning platforms.",
        example=[
            "Microsoft Learn",
            "Kaggle Learn",
            "Coursera",
            "freeCodeCamp",
        ],
    )

    career_tips: list[str] = Field(
        default_factory=list,
        description="General career advice.",
        example=[
            "Upload projects to GitHub.",
            "Optimize your LinkedIn profile.",
            "Practice SQL daily.",
            "Build an ATS-friendly resume.",
        ],
    )

    class Config:
        json_schema_extra = {
            "example": {
                "resume_id": 5,
                "target_role": "Data Analyst",
                "career_summary": "You already possess Python, SQL and Pandas. Focus on Power BI, Tableau and Statistics.",
                "strengths": [
                    "Python",
                    "SQL",
                    "Pandas",
                    "Excel"
                ],
                "weaknesses": [
                    "Power BI",
                    "Statistics",
                    "Tableau"
                ],
                "priority_skills": [
                    "Power BI",
                    "Statistics",
                    "Tableau"
                ],
                "recommended_projects": [
                    "Sales Dashboard",
                    "Customer Churn Analysis",
                    "HR Analytics Dashboard"
                ],
                "interview_questions": [
                    "Explain SQL JOIN types.",
                    "Difference between NumPy and Pandas.",
                    "Explain Central Limit Theorem."
                ],
                "learning_resources": [
                    "Microsoft Learn",
                    "Kaggle Learn",
                    "Coursera",
                    "freeCodeCamp"
                ],
                "career_tips": [
                    "Upload projects to GitHub.",
                    "Optimize your LinkedIn profile.",
                    "Practice SQL daily.",
                    "Build an ATS-friendly resume."
                ]
            }
        }