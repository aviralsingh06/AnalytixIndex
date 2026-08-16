from services.market_intelligence.trend_analyzer import TrendAnalyzer
from services.market_intelligence.salary_analyzer import SalaryAnalyzer
from services.market_intelligence.company_analyzer import CompanyAnalyzer
from services.market_intelligence.location_analyzer import LocationAnalyzer
from sqlalchemy.orm import Session

class AnalyticsService:
    """
    Combines all market intelligence analyzers
    into a single dashboard response.
    """

    @staticmethod
    def analyze(db: Session):

        # ----------------------------------
        # Run Analyzers
        # ----------------------------------

        trends = TrendAnalyzer.analyze(db)

        salaries = SalaryAnalyzer.analyze()

        companies = CompanyAnalyzer.analyze()

        locations = LocationAnalyzer.analyze()

        # ----------------------------------
        # Market Growth
        # ----------------------------------

        market_growth = AnalyticsService._market_growth(
            trends["total_jobs"]
        )

        # ----------------------------------
        # Final Response
        # ----------------------------------

        return {

            "total_jobs": trends["total_jobs"],

            "market_growth": market_growth,

            "remote_jobs": locations["remote_jobs"],

            "onsite_jobs": locations["onsite_jobs"],

            "hybrid_jobs": locations["hybrid_jobs"],

            "top_skills": trends["top_skills"],

            "top_companies": companies["top_companies"],

            "top_locations": locations["top_locations"],

            "salary_insights": salaries["salary_insights"],

            "overall_average_salary": salaries[
                "overall_average_salary"
            ],

        }

    @staticmethod
    def _market_growth(
        total_jobs: int,
    ) -> str:
        """
        Returns market growth only when historical growth data
        is available.

        Current dataset does not contain historical snapshots,
        so growth cannot be calculated reliably.
        """

        return "N/A"