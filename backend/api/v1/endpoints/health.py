from fastapi import APIRouter

router = APIRouter()


@router.get(
    "/health",
    summary="Health Check",
    tags=["Health"]
)
def health_check():
    return {
        "status": "healthy",
        "service": "Data Science Job Market Intelligence Platform API",
        "version": "1.0.0"
    }