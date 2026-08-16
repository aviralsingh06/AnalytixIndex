class SalaryEstimator:
    """
    Estimates salary based on the user's
    match percentage and job salary range.
    """

    @staticmethod
    def estimate(
        salary_range: str,
        match_percentage: float,
    ):

        if match_percentage >= 90:

            recommendation = (
                "Excellent match. Strong candidate for the upper salary range."
            )

        elif match_percentage >= 75:

            recommendation = (
                "Very good match. Competitive for the advertised salary."
            )

        elif match_percentage >= 60:

            recommendation = (
                "Good match. Additional skills can improve salary potential."
            )

        elif match_percentage >= 40:

            recommendation = (
                "Moderate match. Strengthen missing skills before applying."
            )

        else:

            recommendation = (
                "Low match. Focus on skill development before targeting this role."
            )

        return {

            "salary_range": salary_range,

            "match_percentage": match_percentage,

            "salary_recommendation": recommendation,

        }