from utils.jobs.jobs_database import JOBS_DATABASE


class JobMatcher:
    """
    Matches resume skills against available jobs
    and returns ranked recommendations.
    """

    @staticmethod
    def recommend(
        resume_skills: list[str],
        target_role: str | None = None,
        top_n: int = 10,
    ):

        recommendations = []

        resume_skill_set = {
            skill.lower()
            for skill in resume_skills
        }

        for job in JOBS_DATABASE:

            # ----------------------------------
            # Optional Target Role Filter
            # ----------------------------------

            if target_role:

                role = target_role.lower()

                title = job["title"].lower()

                if role not in title:
                    continue

            required = {
                skill.lower()
                for skill in job["required_skills"]
            }

            optional = {
                skill.lower()
                for skill in job["optional_skills"]
            }

            matched_required = sorted(
                required.intersection(
                    resume_skill_set
                )
            )

            missing_required = sorted(
                required - resume_skill_set
            )

            matched_optional = sorted(
                optional.intersection(
                    resume_skill_set
                )
            )

            # ----------------------------------
            # Match Score
            # ----------------------------------

            required_score = (
                len(matched_required)
                / len(required)
            ) * 80

            optional_score = (
                len(matched_optional)
                / max(len(optional), 1)
            ) * 20

            match_percentage = round(
                required_score + optional_score,
                2,
            )

            recommendations.append(

                {

                    "title": job["title"],

                    "company": job["company"],

                    "location": job["location"],

                    "employment_type": job["employment_type"],

                    "experience": job["experience"],

                    "salary": job["salary"],

                    "match_percentage": match_percentage,

                    "matched_skills": sorted(
                        matched_required +
                        matched_optional
                    ),

                    "missing_skills": sorted(
                        missing_required
                    ),

                }

            )

        recommendations.sort(

            key=lambda x: x["match_percentage"],

            reverse=True,

        )

        return recommendations[:top_n]