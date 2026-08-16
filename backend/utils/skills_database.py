from utils.skills.programming import PROGRAMMING_SKILLS
from utils.skills.databases import DATABASE_SKILLS
from utils.skills.web import WEB_SKILLS
from utils.skills.data_science import DATA_SCIENCE_SKILLS
from utils.skills.ai_ml import AI_ML_SKILLS
from utils.skills.cloud import CLOUD_SKILLS
from utils.skills.devops import DEVOPS_SKILLS
from utils.skills.mobile import MOBILE_SKILLS
from utils.skills.testing import TESTING_SKILLS
from utils.skills.tools import TOOLS_SKILLS
from utils.skills.operating_systems import OPERATING_SYSTEMS_SKILLS
from utils.skills.soft_skills import SOFT_SKILLS

# -----------------------------------
# Master Skill Categories
# -----------------------------------

SKILL_CATEGORIES = {
    "Programming": PROGRAMMING_SKILLS,
    "Database": DATABASE_SKILLS,
    "Web Development": WEB_SKILLS,
    "Data Science": DATA_SCIENCE_SKILLS,
    "AI / Machine Learning": AI_ML_SKILLS,
    "Cloud": CLOUD_SKILLS,
    "DevOps": DEVOPS_SKILLS,
    "Mobile Development": MOBILE_SKILLS,
    "Testing": TESTING_SKILLS,
    "Tools": TOOLS_SKILLS,
    "Operating Systems": OPERATING_SYSTEMS_SKILLS,
    "Soft Skills": SOFT_SKILLS,
}

# -----------------------------------
# Flat Skill Dictionary
# -----------------------------------

TECHNICAL_SKILLS = {}

for skills in SKILL_CATEGORIES.values():
    TECHNICAL_SKILLS.update(skills)