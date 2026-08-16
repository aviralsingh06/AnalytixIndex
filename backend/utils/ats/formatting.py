import re


class ResumeFormatting:
    """
    Analyze resume formatting quality.
    """

    EMAIL_PATTERN = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

    PHONE_PATTERN = (
        r"(\+?\d{1,3}[- ]?)?"
        r"(\(?\d{3,5}\)?[- ]?)?"
        r"\d{3,5}[- ]?\d{4}"
    )

    LINKEDIN_PATTERN = r"(linkedin\.com/in/|linkedin)"

    GITHUB_PATTERN = r"(github\.com/|github)"

    PORTFOLIO_PATTERN = (
        r"(portfolio|behance|dribbble|medium\.com|"
        r"vercel\.app|netlify\.app|gitlab\.com)"
    )

    @classmethod
    def analyze(cls, text: str):

        score = 0

        report = {}

        # ------------------------
        # Email
        # ------------------------

        has_email = bool(re.search(cls.EMAIL_PATTERN, text, re.IGNORECASE))

        report["email"] = has_email

        if has_email:
            score += 5

        # ------------------------
        # Phone
        # ------------------------

        has_phone = bool(re.search(cls.PHONE_PATTERN, text))

        report["phone"] = has_phone

        if has_phone:
            score += 5

        # ------------------------
        # LinkedIn
        # ------------------------

        has_linkedin = bool(
            re.search(cls.LINKEDIN_PATTERN, text, re.IGNORECASE)
        )

        report["linkedin"] = has_linkedin

        if has_linkedin:
            score += 5

        # ------------------------
        # GitHub
        # ------------------------

        has_github = bool(
            re.search(cls.GITHUB_PATTERN, text, re.IGNORECASE)
        )

        report["github"] = has_github

        if has_github:
            score += 5

        # ------------------------
        # Portfolio
        # ------------------------

        has_portfolio = bool(
            re.search(cls.PORTFOLIO_PATTERN, text, re.IGNORECASE)
        )

        report["portfolio"] = has_portfolio

        if has_portfolio:
            score += 5

        # ------------------------
        # Resume Length
        # ------------------------

        words = len(text.split())

        if words < 200:

            length_score = 2

        elif words <= 700:

            length_score = 10

        elif words <= 1000:

            length_score = 8

        else:

            length_score = 5

        score += length_score

        report["word_count"] = words
        report["length_score"] = length_score

        # ------------------------
        # Total
        # ------------------------

        report["formatting_score"] = score

        return report