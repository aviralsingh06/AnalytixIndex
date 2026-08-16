from collections import defaultdict

from utils.market_data.market_database import MARKET_DATABASE


class SalaryAnalyzer:
    """
    Analyzes salary trends across the job market.
    """

    @staticmethod
    def analyze():

        role_salaries = defaultdict(list)

        total_salary = 0

        total_jobs = len(MARKET_DATABASE)

        # ----------------------------------
        # Collect Salaries
        # ----------------------------------

        for job in MARKET_DATABASE:

            salary = job["salary_lpa"]

            title = job["title"]

            total_salary += salary

            role_salaries[title].append(salary)

        # ----------------------------------
        # Average Salary Per Role
        # ----------------------------------

        salary_insights = []

        for role, salaries in sorted(role_salaries.items()):

            average_salary = round(

                sum(salaries) / len(salaries),

                2,

            )

            salary_insights.append(

                {

                    "role": role,

                    "average_salary": f"₹{average_salary} LPA",

                }

            )

        # ----------------------------------
        # Overall Average
        # ----------------------------------

        overall_average = round(

            total_salary / total_jobs,

            2,

        )

        return {

            "overall_average_salary": f"₹{overall_average} LPA",

            "salary_insights": salary_insights,

        }