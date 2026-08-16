from schemas.salary import (
    SalaryPredictionRequest,
    SalaryPredictionResponse,
    SkillImpactItem,
)


class SalaryService:
    @staticmethod
    def predict(req: SalaryPredictionRequest) -> SalaryPredictionResponse:

        # Base Annual Salary (INR)
        base_salaries = {
            "Data Analyst": 800000,
            "Business Analyst": 750000,
            "Data Scientist": 1200000,
            "Machine Learning Engineer": 1400000,
            "Data Engineer": 1300000,
            "AI Engineer": 1600000,
            "Software Engineer": 1100000,
            "AI Research Engineer": 1800000,
        }

        base = base_salaries.get(req.role, 900000)

        # -----------------------------
        # Experience Bonus (Annual INR)
        # -----------------------------
        exp_bonus = req.experience_years * 120000

        # -----------------------------
        # Education Bonus
        # -----------------------------
        edu_bonus = 0

        if req.education_level in [
            "Bachelor's",
            "Bachelor",
            "B.Tech",
            "BE",
        ]:
            edu_bonus = 0

        elif req.education_level in [
            "Master's",
            "Master",
            "M.Tech",
            "ME",
            "MBA",
            "MCA",
            "MS",
        ]:
            edu_bonus = 200000

        elif req.education_level == "PhD":
            edu_bonus = 450000

        # -----------------------------
        # Indian Location Multiplier
        # -----------------------------
        location = req.location.lower()

        loc_mult = 1.0

        if "bangalore" in location or "bengaluru" in location:
            loc_mult = 1.18

        elif "hyderabad" in location:
            loc_mult = 1.14

        elif "mumbai" in location:
            loc_mult = 1.16

        elif "pune" in location:
            loc_mult = 1.10

        elif "gurgaon" in location or "gurugram" in location:
            loc_mult = 1.15

        elif "delhi" in location or "noida" in location:
            loc_mult = 1.12

        elif "chennai" in location:
            loc_mult = 1.08

        elif "kolkata" in location:
            loc_mult = 1.05

        elif "ahmedabad" in location:
            loc_mult = 1.04

        elif "remote" in location:
            loc_mult = 1.03

        # -----------------------------
        # Premium Skills
        # -----------------------------
        high_value_skills = {
            "Python",
            "SQL",
            "Power BI",
            "Tableau",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "PyTorch",
            "AWS",
            "Azure",
            "GCP",
            "Snowflake",
            "Databricks",
            "Apache Spark",
            "Airflow",
            "Docker",
            "Kubernetes",
            "LLM",
            "Generative AI",
            "Transformers",
            "NLP",
            "MLOps",
        }

        value_skills = []

        skill_bonus = 0

        for skill in req.skills:

            if skill in high_value_skills:
                bonus = 50000
                demand = "High"

            else:
                bonus = 20000
                demand = "Medium"

            skill_bonus += bonus

            value_skills.append(
                SkillImpactItem(
                    skill=skill,
                    value_add=bonus,
                    demand_level=demand,
                )
            )

        # -----------------------------
        # Salary Calculation
        # -----------------------------
        predicted = int(
            (base + exp_bonus + edu_bonus + skill_bonus) * loc_mult
        )

        range_min = int(predicted * 0.90)
        range_max = int(predicted * 1.15)
        median = predicted

        # -----------------------------
        # Career Growth
        # -----------------------------
        progression = [
            {
                "year": "Current",
                "salary": predicted,
                "role": req.role,
            },
            {
                "year": "+1 Year",
                "salary": int(predicted * 1.12),
                "role": f"Senior {req.role}",
            },
            {
                "year": "+3 Years",
                "salary": int(predicted * 1.35),
                "role": f"Lead {req.role}",
            },
            {
                "year": "+5 Years",
                "salary": int(predicted * 1.65),
                "role": f"Principal {req.role}",
            },
        ]

        return SalaryPredictionResponse(
            predicted_salary=predicted,
            salary_range_min=range_min,
            salary_range_max=range_max,
            median_salary=median,
            currency="INR",
            experience_impact=f"+₹{exp_bonus:,} ({req.experience_years} Years Experience)",
            education_impact=f"+₹{edu_bonus:,} ({req.education_level})",
            location_impact=f"{int((loc_mult - 1) * 100)}% Market Adjustment ({req.location})",
            top_value_skills=value_skills[:5],
            career_progression_forecast=progression,
        )