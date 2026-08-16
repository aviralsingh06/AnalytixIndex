from utils.job_roles import JOB_ROLES
from utils.learning_paths import LEARNING_PATHS


class RecommendationEngine:
    """
    Generates career recommendations
    based on the target role and missing skills.
    """

    @staticmethod
    def generate(
        target_role: str,
        missing_skills: list[str],
    ):

        role = JOB_ROLES.get(target_role)

        if role is None:
            raise ValueError("Invalid target role.")

        roadmap = LEARNING_PATHS.get(
            target_role,
            {}
        )

        # ------------------------------------
        # Priority Skills
        # ------------------------------------

        priority_skills = missing_skills[:5]

        # ------------------------------------
        # Recommended Projects
        # ------------------------------------

        projects = RecommendationEngine._projects(
            target_role
        )

        # ------------------------------------
        # Interview Questions
        # ------------------------------------

        interview_questions = RecommendationEngine._questions(
            target_role
        )

        # ------------------------------------
        # Learning Resources
        # ------------------------------------

        learning_resources = [

            "Microsoft Learn",

            "Kaggle Learn",

            "Coursera",

            "freeCodeCamp",

            "YouTube",

            "Official Documentation",

        ]

        # ------------------------------------
        # Career Tips
        # ------------------------------------

        career_tips = [

            "Build at least 5 portfolio projects.",

            "Upload every project to GitHub.",

            "Keep your LinkedIn profile updated.",

            "Practice SQL every day.",

            "Tailor your resume for every application.",

            "Participate in hackathons and coding competitions.",

            "Contribute to open-source projects.",

            "Prepare behavioral interview answers.",

        ]

        return {

            "career_summary": (
                f"You already possess several relevant skills. "
                f"Focus on {', '.join(priority_skills) if priority_skills else 'advanced projects'} "
                f"to improve your chances of becoming a {target_role}."
            ),

            "strengths": role["required"],

            "weaknesses": missing_skills,

            "priority_skills": priority_skills,

            "recommended_projects": projects,

            "interview_questions": interview_questions,

            "learning_resources": learning_resources,

            "career_tips": career_tips,

            "roadmap": roadmap,

        }

    # ====================================
    # Projects
    # ====================================

    @staticmethod
    def _projects(target_role: str):

        projects = {

            "Data Analyst": [

                "Sales Dashboard",

                "HR Analytics Dashboard",

                "Customer Churn Analysis",

                "Financial KPI Dashboard",

                "Retail Analytics",

            ],

            "Data Scientist": [

                "House Price Prediction",

                "Fraud Detection",

                "Recommendation System",

                "Customer Segmentation",

                "Demand Forecasting",

            ],

            "Machine Learning Engineer": [

                "Image Classification",

                "Spam Detection",

                "Face Recognition",

                "Object Detection",

                "Predictive Maintenance",

            ],

            "Frontend Developer": [

                "Portfolio Website",

                "Weather App",

                "Task Manager",

                "E-Commerce UI",

                "Movie Search App",

            ],

            "Backend Developer": [

                "REST API",

                "Authentication System",

                "Blog Backend",

                "Inventory Management API",

                "Chat Application Backend",

            ],

            "Full Stack Developer": [

                "Job Portal",

                "Hospital Management",

                "Expense Tracker",

                "E-Commerce Platform",

                "Social Media App",

            ],

        }

        return projects.get(target_role, [])

    # ====================================
    # Interview Questions
    # ====================================

    @staticmethod
    def _questions(target_role: str):

        questions = {

            "Data Analyst": [

                "Explain SQL JOIN types.",

                "Difference between GROUP BY and ORDER BY.",

                "What is normalization?",

                "Explain Central Limit Theorem.",

                "Difference between NumPy and Pandas.",

            ],

            "Data Scientist": [

                "Explain Bias vs Variance.",

                "What is Cross Validation?",

                "Difference between Bagging and Boosting.",

                "Explain Random Forest.",

                "How does XGBoost work?",

            ],

            "Machine Learning Engineer": [

                "Explain Gradient Descent.",

                "How do CNNs work?",

                "Difference between TensorFlow and PyTorch.",

                "Explain Model Deployment.",

                "How do you prevent overfitting?",

            ],

            "Frontend Developer": [

                "Explain Virtual DOM.",

                "Difference between var, let and const.",

                "Explain React Hooks.",

                "What is Event Bubbling?",

                "Difference between Flexbox and Grid.",

            ],

            "Backend Developer": [

                "Explain REST APIs.",

                "Difference between GET and POST.",

                "JWT vs Session Authentication.",

                "Explain Database Indexing.",

                "How does FastAPI work?",

            ],

            "Full Stack Developer": [

                "Explain MVC Architecture.",

                "Authentication Flow.",

                "Difference between SQL and NoSQL.",

                "How would you deploy a MERN app?",

                "Explain Docker.",

            ],

        }

        return questions.get(target_role, [])