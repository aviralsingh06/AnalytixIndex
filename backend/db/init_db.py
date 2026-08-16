import json
from sqlalchemy import text
from db.database import Base, engine, SessionLocal
import models  # Imports all models registered in models/__init__.py
from core.security import get_password_hash


def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Add missing columns to existing users table if any exist
        migrations = [
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS target_role VARCHAR(100) DEFAULT 'Data Scientist';",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS experience_level VARCHAR(50) DEFAULT 'Entry-Level';",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS file_path VARCHAR(500);",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS file_type VARCHAR(50) DEFAULT 'pdf';",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS file_size INTEGER DEFAULT 0;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS summary TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS contact_info TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS education TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS experience TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS projects TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS certifications TEXT;",
            "ALTER TABLE resumes ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 70;",
            "ALTER TABLE skills ADD COLUMN IF NOT EXISTS proficiency VARCHAR(50) DEFAULT 'Intermediate';",
        ]
        for query in migrations:
            try:
                db.execute(text(query))
                db.commit()
            except Exception:
                db.rollback()

        # Seed Demo User if not present
        demo_user = db.query(models.User).filter(models.User.email == "alex.chen@example.com").first()
        if not demo_user:
            demo_user = models.User(
                full_name="Alex Chen",
                email="alex.chen@example.com",
                password=get_password_hash("password123"),
                target_role="Data Scientist",
                experience_level="Mid-Level",
                is_active=True,
                is_verified=True,
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)

            profile = models.Profile(
                user_id=demo_user.id,
                bio="Passionate AI & Data Science Engineer specializing in NLP, Machine Learning, and Cloud Deployments.",
                location="San Francisco, CA",
                phone="+1 (555) 234-5678",
                github_url="https://github.com/alexchen-ds",
                linkedin_url="https://linkedin.com/in/alexchen-ds",
                portfolio_url="https://alexchen.dev",
                target_role="Data Scientist",
                preferred_location="Remote",
                target_salary_min=110000,
                target_salary_max=165000,
                highest_degree="Master's in Data Science",
            )
            db.add(profile)

            settings = models.UserSettings(
                user_id=demo_user.id,
                theme="dark",
                email_notifications="true",
                job_alerts="true",
                market_digest="weekly",
                privacy_mode="private",
            )
            db.add(settings)

            # Seed sample user activity
            activities = [
                models.UserActivity(user_id=demo_user.id, action_type="UPLOAD_RESUME", description="Uploaded resume: Data_Scientist_Resume_2026.pdf"),
                models.UserActivity(user_id=demo_user.id, action_type="ATS_ANALYSIS", description="Ran ATS Analysis for Data Scientist role - Score 84%"),
                models.UserActivity(user_id=demo_user.id, action_type="SKILL_GAP", description="Generated Skill Gap Roadmap for Senior ML Engineer"),
            ]
            db.add_all(activities)

            # Seed initial sample resume
            sample_resume = models.Resume(
                user_id=demo_user.id,
                file_name="Data_Scientist_Resume_2026.pdf",
                file_type="pdf",
                file_size=142850,
                score=84,
                parsed_text="Alex Chen | Data Scientist | Python, SQL, PyTorch, Scikit-Learn, AWS, Docker, Pandas, NumPy, Machine Learning",
                summary="Results-driven Data Scientist with 3+ years experience building predictive models, NLP pipelines, and interactive analytics dashboards.",
                contact_info=json.dumps({"email": "alex.chen@example.com", "phone": "+1 555-234-5678", "linkedin": "linkedin.com/in/alexchen-ds", "github": "github.com/alexchen-ds"}),
                education=json.dumps([{"degree": "Master of Science in Data Science", "institution": "Stanford University", "year": "2023"}]),
                experience=json.dumps([{"title": "Data Scientist", "company": "TechCorp", "duration": "2023 - Present", "description": "Developed predictive customer churn models achieving 89% precision using XGBoost and PyTorch."}]),
                projects=json.dumps([{"title": "AI Market Analyzer", "tech_stack": "Python, FastAPI, Next.js, Scikit-Learn", "description": "Real-time scraper and analyzer for tech job postings."}]),
                certifications=json.dumps(["AWS Certified Machine Learning - Specialty", "DeepLearning.AI TensorFlow Developer"]),
            )
            db.add(sample_resume)
            db.commit()
            db.refresh(sample_resume)

            # Seed skills for sample resume
            skills_data = [
                ("Python", "Technical", "Advanced"),
                ("SQL", "Technical", "Advanced"),
                ("PyTorch", "Technical", "Intermediate"),
                ("Scikit-Learn", "Technical", "Advanced"),
                ("AWS", "Cloud", "Intermediate"),
                ("Docker", "DevOps", "Intermediate"),
                ("Pandas", "Technical", "Expert"),
                ("NumPy", "Technical", "Expert"),
                ("Machine Learning", "Core", "Advanced"),
                ("Problem Solving", "Soft Skill", "Expert"),
                ("Data Visualization", "Technical", "Advanced"),
            ]
            for name, cat, prof in skills_data:
                db.add(models.Skill(resume_id=sample_resume.id, skill_name=name, category=cat, proficiency=prof))

        # Seed Companies and Jobs if empty
        if db.query(models.Company).count() == 0:
            c1 = models.Company(name="OpenAI Labs", industry="Artificial Intelligence", location="San Francisco, CA", rating="4.9", employee_count="1000+")
            c2 = models.Company(name="DataPulse Analytics", industry="Data Infrastructure", location="New York, NY", rating="4.7", employee_count="500-1000")
            c3 = models.Company(name="CloudMind Systems", industry="Cloud Computing & AI", location="Seattle, WA", rating="4.6", employee_count="100-500")
            c4 = models.Company(name="FinTech AI Solutions", industry="Financial Services", location="Chicago, IL", rating="4.8", employee_count="5000+")
            db.add_all([c1, c2, c3, c4])
            db.commit()

            jobs_data = [
                models.Job(
                    company_id=c1.id,
                    title="Senior Machine Learning Engineer",
                    location="San Francisco, CA",
                    work_type="Hybrid",
                    employment_type="Full-time",
                    experience_level="Senior",
                    salary_min=160000,
                    salary_max=220000,
                    description="We are seeking an experienced ML Engineer to scale deep learning inference pipelines and LLM fine-tuning architecture.",
                    required_skills=json.dumps(["Python", "PyTorch", "Transformers", "Distributed Training", "CUDA", "Kubernetes", "AWS"]),
                    optional_skills=json.dumps(["Triton", "ONNX", "MLflow"]),
                    apply_url="https://openai.com/careers",
                ),
                models.Job(
                    company_id=c2.id,
                    title="Data Scientist - Predictive Analytics",
                    location="Remote",
                    work_type="Remote",
                    employment_type="Full-time",
                    experience_level="Mid-Level",
                    salary_min=120000,
                    salary_max=160000,
                    description="Build customer behavior models, time-series forecasting algorithms, and automated analytics pipelines for Fortune 500 clients.",
                    required_skills=json.dumps(["Python", "SQL", "Scikit-Learn", "XGBoost", "Pandas", "Data Visualization", "Tableau"]),
                    optional_skills=json.dumps(["Snowflake", "dbt", "Airflow"]),
                    apply_url="https://datapulse.io/jobs",
                ),
                models.Job(
                    company_id=c3.id,
                    title="AI Data Analyst & BI Developer",
                    location="Seattle, WA",
                    work_type="On-site",
                    employment_type="Full-time",
                    experience_level="Entry-Level",
                    salary_min=85000,
                    salary_max=115000,
                    description="Transform complex telemetry data into actionable executive insights, automated dashboards, and SQL data models.",
                    required_skills=json.dumps(["SQL", "Python", "PowerBI", "Excel", "Data Modeling", "A/B Testing"]),
                    optional_skills=json.dumps(["PostgreSQL", "Google Looker"]),
                    apply_url="https://cloudmind.tech/careers",
                ),
                models.Job(
                    company_id=c4.id,
                    title="Lead Data Engineer",
                    location="Chicago, IL",
                    work_type="Hybrid",
                    employment_type="Full-time",
                    experience_level="Lead",
                    salary_min=175000,
                    salary_max=240000,
                    description="Architect real-time streaming data pipelines handling petabytes of financial transactions daily using Apache Spark and Kafka.",
                    required_skills=json.dumps(["Python", "SQL", "Apache Spark", "Kafka", "Snowflake", "Airflow", "AWS", "Docker"]),
                    optional_skills=json.dumps(["Scala", "Terraform", "Redshift"]),
                    apply_url="https://fintechai.com/jobs",
                )
            ]
            db.add_all(jobs_data)
            db.commit()

        # Seed Courses if empty
        if db.query(models.Course).count() == 0:
            courses_data = [
                models.Course(title="Machine Learning Specialization", provider="Coursera / DeepLearning.AI", skill_category="Machine Learning", type="Course", difficulty="Beginner-Intermediate", duration="3 months", rating="4.9", url="https://coursera.org/specializations/machine-learning-introduction", description="Master fundamental ML concepts from Linear Regression to Neural Networks with Andrew Ng."),
                models.Course(title="Deep Learning with PyTorch", provider="Udacity", skill_category="Deep Learning", type="Course", difficulty="Intermediate", duration="2 months", rating="4.8", url="https://udacity.com/course/deep-learning-pytorch", description="Build custom neural networks, CNNs, RNNs, and Transformers using PyTorch."),
                models.Course(title="Complete SQL Bootcamp for Data Science", provider="Udemy", skill_category="SQL", type="Course", difficulty="All Levels", duration="20 hours", rating="4.7", url="https://udemy.com/course/the-complete-sql-bootcamp", description="Master PostgreSQL, complex JOINs, CTEs, Window Functions, and Query Optimization."),
                models.Course(title="Python for Data Analysis & Pandas Documentation", provider="Official Docs", skill_category="Python", type="Documentation", difficulty="Intermediate", duration="Self-Paced", rating="4.9", url="https://pandas.pydata.org/docs/", description="Comprehensive official pandas user guide and API reference."),
                models.Course(title="Kaggle Titanic & House Prices Machine Learning", provider="Kaggle", skill_category="Data Science", type="Competition", difficulty="Beginner", duration="10 hours", rating="4.9", url="https://kaggle.com/competitions", description="Hands-on practice competition for feature engineering, model tuning, and evaluation."),
            ]
            db.add_all(courses_data)
            db.commit()

    finally:
        db.close()