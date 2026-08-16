from utils.learning_paths import LEARNING_PATHS


class RoadmapService:

    @staticmethod
    def generate(
        target_role: str,
        missing_skills: list[str],
    ):
        """
        Generate a personalized learning roadmap
        based on missing skills.
        """

        roadmap = LEARNING_PATHS.get(target_role)

        if roadmap is None:
            raise ValueError("Invalid target role.")

        learning_plan = []

        for skill in missing_skills:

            if skill in roadmap:

                item = roadmap[skill].copy()

                item["skill"] = skill

                learning_plan.append(item)

        learning_plan.sort(
            key=lambda x: x["priority"]
        )

        total_weeks = sum(
            item["estimated_weeks"]
            for item in learning_plan
        )

        return {

            "target_role": target_role,

            "total_missing_skills": len(learning_plan),

            "estimated_completion_weeks": total_weeks,

            "learning_plan": learning_plan,

        }