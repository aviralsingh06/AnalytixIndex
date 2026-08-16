import re


class BulletImprover:
    """
    Improves weak resume bullet points into
    professional ATS-friendly statements.
    """

    ACTION_VERBS = [
        "Developed",
        "Designed",
        "Built",
        "Implemented",
        "Created",
        "Optimized",
        "Engineered",
        "Automated",
        "Analyzed",
        "Integrated",
    ]

    @staticmethod
    def improve(text: str) -> list[dict]:
        """
        Converts weak bullet points into stronger ones.
        """

        if not text:
            return []

        lines = [
            line.strip()
            for line in text.split("\n")
            if line.strip()
        ]

        results = []

        for line in lines:

            if len(line) < 15:
                continue

            improved = BulletImprover._rewrite(line)

            results.append(
                {
                    "original": line,
                    "improved": improved,
                }
            )

        return results

    @staticmethod
    def _rewrite(line: str) -> str:

        sentence = line.strip()

        sentence = re.sub(
            r"^[•\-\*\d\.\)]*\s*",
            "",
            sentence,
        )

        sentence = sentence[0].upper() + sentence[1:]

        starts = (
            "Developed",
            "Designed",
            "Created",
            "Built",
            "Implemented",
            "Worked",
            "Made",
            "Did",
            "Responsible",
        )

        if sentence.startswith(starts):
            return sentence

        return f"Developed {sentence.lower()}"