from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db
from services.market_intelligence.analytics_service import AnalyticsService

router = APIRouter()


@router.get(
    "/market-intelligence",
    summary="Market Intelligence Dashboard",
)
def get_market_intelligence(
    db: Session = Depends(get_db),
):
    return AnalyticsService.analyze(db)