from collections import Counter

from sqlalchemy.orm import Session

from models.job import Job


class TrendAnalyzer:

    @staticmethod
    def analyze(db: Session):

        jobs = (
            db.query(Job)
            .filter(Job.is_active == True)
            .all()
        )

        total_jobs = len(jobs)

        skill_counter = Counter()

        for job in jobs:

            skills = []

            if job.required_skills:
                if isinstance(job.required_skills, list):
                    skills.extend(job.required_skills)
                elif isinstance(job.required_skills, str):
                    skills.extend(
                        skill.strip()
                        for skill in job.required_skills.split(",")
                        if skill.strip()
                    )

            if job.optional_skills:
                if isinstance(job.optional_skills, list):
                    skills.extend(job.optional_skills)
                elif isinstance(job.optional_skills, str):
                    skills.extend(
                        skill.strip()
                        for skill in job.optional_skills.split(",")
                        if skill.strip()
                    )

            skill_counter.update(
                skill.strip()
                for skill in skills
                if skill and skill.strip()
            )

        top_skills = []

        for skill, count in skill_counter.most_common():

            demand_percentage = (
                round((count / total_jobs) * 100, 2)
                if total_jobs
                else 0
            )

            top_skills.append(
                {
                    "skill": skill,
                    "demand_percentage": demand_percentage,
                    "job_count": count,
                }
            )

        return {
            "total_jobs": total_jobs,
            "top_skills": top_skills,
        }

    @staticmethod
    def _extract_skills(job: dict):
        """
        Safely pulls a clean list of skill names out of a job record,
        regardless of whether "skills" is missing, a list, or a
        comma-separated string. Also tolerates alternate key names
        that sometimes show up in the dataset (skill_set, tech_stack).
        """

        raw = (
            job.get("skills")
            or job.get("skill_set")
            or job.get("tech_stack")
            or []
        )

        # Case 1: already a list/tuple of skill names
        if isinstance(raw, (list, tuple, set)):
            return [
                str(skill).strip()
                for skill in raw
                if str(skill).strip()
            ]

        # Case 2: a single comma-separated string
        if isinstance(raw, str):
            return [
                skill.strip()
                for skill in raw.split(",")
                if skill.strip()
            ]

        return []