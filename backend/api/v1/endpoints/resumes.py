from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session

from db.dependencies import get_db
from services.resume_service import ResumeService
from schemas.resume import ResumeResponse

router = APIRouter()


@router.post(
    "/upload",
    response_model=ResumeResponse,
    summary="Upload Resume"
)
async def upload_resume(
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    return await ResumeService.upload_resume(
        db=db,
        user_id=user_id,
        file=file,
    )