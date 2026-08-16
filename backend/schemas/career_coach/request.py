from pydantic import BaseModel, Field


class CareerCoachRequest(BaseModel):

    resume_id: int = Field(
        ...,
        gt=0,
        description="Resume ID stored in the database.",
        example=5,
    )

    target_role: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Desired job role.",
        example="Data Analyst",
    )

    class Config:
        json_schema_extra = {
            "example": {
                "resume_id": 5,
                "target_role": "Data Analyst"
            }
        }