import re
from typing import List, Dict

from utils.text_cleaner import TextCleaner
from utils.skills_database import SKILL_CATEGORIES


class SkillExtractor:
    """
    Professional Resume Skill Extraction Engine
    Uses canonical skill names and alias matching.
    """

    @staticmethod
    def extract(text: str) -> List[Dict[str, str]]:
        """
        Extract technical skills from resume text.

        Returns:
        [
            {
                "skill_name": "Python",
                "category": "Programming"
            },
            ...
        ]
        """

        if not text:
            return []

        # Clean resume text
        cleaned_text = TextCleaner.clean(text).lower()

        results = []
        found = set()

        # Search every category
        for category, skills in SKILL_CATEGORIES.items():

            # skills is a dictionary
            # Example:
            # {
            #     "Python": ["python", "python3", "py"],
            #     "Java": ["java"]
            # }

            for canonical_skill, aliases in skills.items():

                # Search every alias
                for alias in aliases:

                    alias = alias.lower().strip()

                    if not alias:
                        continue

                    pattern = rf"\b{re.escape(alias)}\b"

                    if re.search(pattern, cleaned_text):

                        if canonical_skill not in found:

                            found.add(canonical_skill)

                            results.append(
                                {
                                    "skill_name": canonical_skill,
                                    "category": category,
                                }
                            )

                        # Stop checking aliases once one matches
                        break

        return sorted(
            results,
            key=lambda skill: (
                skill["category"],
                skill["skill_name"]
            )
        )