import re


class ResumeSections:

    """
    Detect standard resume sections.
    """

    SECTION_PATTERNS = {

        "summary": [
            r"\bsummary\b",
            r"\bprofessional summary\b",
            r"\bprofile\b",
            r"\bobjective\b",
        ],

        "skills": [
            r"\bskills\b",
            r"\btechnical skills\b",
            r"\bcore competencies\b",
            r"\bcompetencies\b",
        ],

        "projects": [
            r"\bprojects\b",
            r"\bacademic projects\b",
            r"\bpersonal projects\b",
            r"\bproject experience\b",
        ],

        "experience": [
            r"\bexperience\b",
            r"\bwork experience\b",
            r"\bprofessional experience\b",
            r"\bemployment\b",
            r"\binternship\b",
        ],

        "education": [
            r"\beducation\b",
            r"\bacademic background\b",
            r"\bqualification\b",
            r"\bqualifications\b",
        ],

        "certifications": [
            r"\bcertifications\b",
            r"\blicenses\b",
            r"\bcertificates\b",
        ],

        "achievements": [
            r"\bachievements\b",
            r"\bawards\b",
            r"\bhonors\b",
        ],

        "languages": [
            r"\blanguages\b",
        ],

        "contact": [
            r"\bcontact\b",
        ],

    }

    @classmethod
    def detect(cls, text: str):

        text = text.lower()

        detected = {}

        for section, patterns in cls.SECTION_PATTERNS.items():

            found = False

            for pattern in patterns:

                if re.search(pattern, text):
                    found = True
                    break

            detected[section] = found

        return detected