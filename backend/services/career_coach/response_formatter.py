class ResponseFormatter:
    """
    Standardizes the Career Coach response.
    """

    @staticmethod
    def format(
        resume_id: int,
        target_role: str,
        recommendations: dict,
    ):

        return {

            "resume_id": resume_id,

            "target_role": target_role,

            "career_summary": recommendations.get(
                "career_summary",
                "",
            ),

            "strengths": recommendations.get(
                "strengths",
                [],
            ),

            "weaknesses": recommendations.get(
                "weaknesses",
                [],
            ),

            "priority_skills": recommendations.get(
                "priority_skills",
                [],
            ),

            "recommended_projects": recommendations.get(
                "recommended_projects",
                [],
            ),

            "interview_questions": recommendations.get(
                "interview_questions",
                [],
            ),

            "learning_resources": recommendations.get(
                "learning_resources",
                [],
            ),

            "career_tips": recommendations.get(
                "career_tips",
                [],
            ),

            "roadmap": recommendations.get(
                "roadmap",
                {},
            ),

        }