from utils.job_roles import JOB_ROLES
from services.roadmap_service import RoadmapService


class SkillGapService:

    @staticmethod
    def analyze(
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

        match_percentage = round(
            (
                len(matched_required)
                / len(required)
            )
            * 100,
            2,
        )

        roadmap = RoadmapService.generate(
            target_role=target_role,
            missing_skills=missing_required,
        )

        return {

            "target_role": target_role,

            "match_percentage": match_percentage,

            "required_total": len(required),
            "matched_required_count": len(matched_required),
            "missing_required_count": len(missing_required),

            "optional_total": len(optional),
            "matched_optional_count": len(matched_optional),
            "missing_optional_count": len(missing_optional),

            "required_skills": sorted(required),

            "matched_required": matched_required,
            "missing_required": missing_required,

            "matched_optional": matched_optional,
            "missing_optional": missing_optional,

            "roadmap": roadmap,

        }