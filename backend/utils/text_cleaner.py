import re


class TextCleaner:

    @staticmethod
    def clean(text: str) -> str:

        # lowercase
        text = text.lower()

        # remove urls
        text = re.sub(r"http\S+", " ", text)

        # remove emails
        text = re.sub(r"\S+@\S+", " ", text)

        # remove phone numbers
        text = re.sub(r"\+?\d[\d\s\-]{8,}", " ", text)

        # remove punctuation
        text = re.sub(r"[^\w\s]", " ", text)

        # remove multiple spaces
        text = re.sub(r"\s+", " ", text)

        return text.strip()