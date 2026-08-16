from .programming import PROGRAMMING_SKILLS
from .databases import DATABASE_SKILLS
from .data_science import DATA_SCIENCE_SKILLS
from .ai_ml import AI_ML_SKILLS
from .cloud import CLOUD_SKILLS
from .devops import DEVOPS_SKILLS
from .web import WEB_SKILLS
from .mobile import MOBILE_SKILLS
from .testing import TESTING_SKILLS
from .tools import TOOLS_SKILLS
from .operating_systems import OPERATING_SYSTEMS_SKILLS
from .soft_skills import SOFT_SKILLS


SKILL_CATEGORIES = {
    "Programming": PROGRAMMING_SKILLS,
    "Database": DATABASE_SKILLS,
    "Data Science": DATA_SCIENCE_SKILLS,
    "AI / Machine Learning": AI_ML_SKILLS,
    "Cloud": CLOUD_SKILLS,
    "DevOps": DEVOPS_SKILLS,
    "Web Development": WEB_SKILLS,
    "Mobile Development": MOBILE_SKILLS,
    "Testing": TESTING_SKILLS,
    "Tools": TOOLS_SKILLS,
    "Operating Systems": OPERATING_SYSTEMS_SKILLS,
    "Soft Skills": SOFT_SKILLS,
}


TECHNICAL_SKILLS = {}

for skills in SKILL_CATEGORIES.values():
    TECHNICAL_SKILLS.update(skills)