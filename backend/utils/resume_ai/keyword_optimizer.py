from utils.job_roles import JOB_ROLES


class KeywordOptimizer:
    """
    Compares resume skills against the target role
    and recommends missing ATS keywords.
    """

    @staticmethod
    def optimize(
        resume_skills: list[str],
        target_role: str,
    ):

        role = JOB_ROLES.get(target_role)

        if role is None:
            raise ValueError("Invalid target role.")

        required = set(role["required"])
        optional = set(role["optional"])

        resume = set(resume_skills)

        matched_required = sorted(
            required.intersection(resume)
        )

        missing_required = sorted(
            required - resume
        )

        matched_optional = sorted(
            optional.intersection(resume)
        )

        missing_optional = sorted(
            optional - resume
        )

        ats_keywords = sorted(
            required.union(optional)
        )

        keyword_score = round(
            (
                len(matched_required)
                / len(required)
            ) * 100,
            2,
        )

        return {

            "target_role": target_role,

            "keyword_score": keyword_score,

            "ats_keywords": ats_keywords,

            "matched_keywords": sorted(
                matched_required + matched_optional
            ),

            "missing_keywords": sorted(
                missing_required + missing_optional
            ),

            "required_missing": missing_required,

            "optional_missing": missing_optional,

        }