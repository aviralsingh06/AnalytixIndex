from utils.ats.sections import ResumeSections
from utils.ats.formatting import ResumeFormatting


class ATSScorer:
    """
    Professional ATS Resume Scoring Engine
    """

    SECTION_WEIGHTS = {
        "summary": 3,
        "skills": 5,
        "projects": 10,
        "experience": 10,
        "education": 7,
        "certifications": 3,
        "achievements": 2,
    }

    @classmethod
    def calculate(
        cls,
        resume_text: str,
        matched_required: list[str],
        missing_required: list[str],
        matched_optional: list[str],
        missing_optional: list[str],
    ):

        score = 0

        breakdown = {}

        # ---------------------------------------
        # Required Skills (35 Marks)
        # ---------------------------------------

        total_required = len(matched_required) + len(missing_required)

        if total_required == 0:
            required_score = 35
        else:
            required_score = round(
                (len(matched_required) / total_required) * 35,
                2,
            )

        score += required_score

        breakdown["required_skills"] = required_score

        # ---------------------------------------
        # Optional Skills (15 Marks)
        # ---------------------------------------

        total_optional = len(matched_optional) + len(missing_optional)

        if total_optional == 0:
            optional_score = 15
        else:
            optional_score = round(
                (len(matched_optional) / total_optional) * 15,
                2,
            )

        score += optional_score

        breakdown["optional_skills"] = optional_score

        # ---------------------------------------
        # Resume Sections (20 Marks)
        # ---------------------------------------

        detected = ResumeSections.detect(resume_text)

        section_score = 0

        for section, weight in cls.SECTION_WEIGHTS.items():

            if detected.get(section):

                section_score += weight

        section_score = min(section_score, 20)

        score += section_score

        breakdown["sections"] = section_score

        # ---------------------------------------
        # Formatting (30 Marks)
        # ---------------------------------------

        formatting = ResumeFormatting.analyze(resume_text)

        formatting_score = formatting["formatting_score"]

        formatting_score = min(formatting_score, 30)

        score += formatting_score

        breakdown["formatting"] = formatting_score

        # ---------------------------------------
        # Final Score
        # ---------------------------------------

        final_score = round(min(score, 100), 2)

        if final_score >= 90:

            grade = "A+"

        elif final_score >= 80:

            grade = "A"

        elif final_score >= 70:

            grade = "B"

        elif final_score >= 60:

            grade = "C"

        elif final_score >= 50:

            grade = "D"

        else:

            grade = "F"

        return {

            "ats_score": final_score,

            "grade": grade,

            "breakdown": breakdown,

            "sections": detected,

            "formatting": formatting,
        }