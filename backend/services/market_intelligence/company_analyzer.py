from collections import Counter

from utils.market_data.market_database import MARKET_DATABASE


class CompanyAnalyzer:
    """
    Analyzes hiring trends across companies.
    """

    @staticmethod
    def analyze():

        company_counter = Counter()

        total_jobs = len(MARKET_DATABASE)

        # ----------------------------------
        # Count Company Openings
        # ----------------------------------

        for job in MARKET_DATABASE:

            company_counter.update(

                [job["company"]]

            )

        # ----------------------------------
        # Prepare Response
        # ----------------------------------

        top_companies = []

        for company, openings in company_counter.most_common():

            hiring_percentage = round(

                (openings / total_jobs) * 100,

                2,

            )

            top_companies.append(

                {

                    "company": company,

                    "openings": openings,

                    "hiring_percentage": hiring_percentage,

                }

            )

        return {

            "total_jobs": total_jobs,

            "top_companies": top_companies,

        }