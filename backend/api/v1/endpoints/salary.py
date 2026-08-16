from fastapi import APIRouter, Depends
from schemas.salary import SalaryPredictionRequest, SalaryPredictionResponse, SkillImpactItem
from services.salary_service import SalaryService

router = APIRouter(prefix="/salary", tags=["Salary Prediction"])


@router.post("/predict", response_model=SalaryPredictionResponse)
def predict_salary(payload: SalaryPredictionRequest):
    return SalaryService.predict(payload)
