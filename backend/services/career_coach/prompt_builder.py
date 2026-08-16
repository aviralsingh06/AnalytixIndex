class PromptBuilder:
    """
    Builds structured prompts for AI Career Coach.
    This class is LLM-agnostic and can be used with
    OpenAI, Gemini, Claude, Ollama, etc.
    """

    @staticmethod
    def build(
        target_role: str,
        ats_score: float,
        matched_skills: list[str],
        missing_skills: list[str],
    ) -> str:

        matched = (
            ", ".join(matched_skills)
            if matched_skills
            else "None"
        )

        missing = (
            ", ".join(missing_skills)
            if missing_skills
            else "None"
        )

        prompt = f"""
You are an experienced Career Coach and Senior Technical Recruiter.

Candidate Target Role:
{target_role}

Current ATS Score:
{ats_score}/100

Skills Already Present:
{matched}

Missing Skills:
{missing}

Generate professional career guidance using the following format.

1. Career Summary
2. Top Strengths
3. Biggest Weaknesses
4. Priority Skills to Learn
5. Portfolio Projects
6. Interview Preparation Tips
7. Resume Improvement Advice
8. Learning Strategy
9. Final Career Roadmap

Keep the advice practical, concise and actionable.
"""

        return prompt.strip()