class ResumeFeedback:
    """
    Generates professional resume feedback
    based on ATS analysis.
    """

    @staticmethod
    def generate(

        ats_score: float,

        skill_gap: dict,

        formatting: dict,

        sections: dict,

    ):

        strengths = []
        weaknesses = []
        recommendations = []

        # ----------------------------------
        # ATS Score
        # ----------------------------------

        if ats_score >= 80:

            strengths.append(
                "Excellent ATS compatibility."
            )

        elif ats_score >= 65:

            strengths.append(
                "Good ATS compatibility."
            )

        else:

            weaknesses.append(
                "Low ATS score."
            )

            recommendations.append(
                "Improve missing required skills."
            )

        # ----------------------------------
        # Missing Skills
        # ----------------------------------

        missing = skill_gap["missing_required"]

        if missing:

            weaknesses.append(
                f"Missing {len(missing)} required skills."
            )

            recommendations.append(
                "Add these skills if you have experience: "
                + ", ".join(missing)
            )

        else:

            strengths.append(
                "All required skills are present."
            )

        # ----------------------------------
        # Resume Sections
        # ----------------------------------

        required_sections = [
            "summary",
            "skills",
            "projects",
            "experience",
            "education",
        ]

        for section in required_sections:

            if not sections.get(section, False):

                weaknesses.append(
                    f"Missing {section.title()} section."
                )

                recommendations.append(
                    f"Include a {section.title()} section."
                )

        # ----------------------------------
        # Formatting
        # ----------------------------------

        if not formatting["email"]:

            weaknesses.append(
                "Email address not detected."
            )

            recommendations.append(
                "Include a professional email."
            )

        if not formatting["phone"]:

            weaknesses.append(
                "Phone number not detected."
            )

            recommendations.append(
                "Include a contact number."
            )

        if not formatting["linkedin"]:

            recommendations.append(
                "Add your LinkedIn profile."
            )

        if not formatting["github"]:

            recommendations.append(
                "Add your GitHub profile."
            )

        if formatting["word_count"] < 250:

            recommendations.append(
                "Resume appears too short."
            )

        elif formatting["word_count"] > 800:

            recommendations.append(
                "Reduce resume length."
            )

        # ----------------------------------
        # Final Summary
        # ----------------------------------

        if ats_score >= 80:

            overall = (
                "Strong resume with minor improvements needed."
            )

        elif ats_score >= 65:

            overall = (
                "Good resume but several improvements are recommended."
            )

        else:

            overall = (
                "Resume requires significant improvement for ATS systems."
            )

        return {

            "overall_feedback": overall,

            "strengths": strengths,

            "weaknesses": weaknesses,

            "recommendations": recommendations,

        }