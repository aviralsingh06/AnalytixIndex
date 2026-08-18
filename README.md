# AnalytixIndex

### AI-Powered Data Science Job Market Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-7C3AED?style=for-the-badge)](https://analytixindex-web.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/aviralsingh06/AnalytixIndex)

AnalytixIndex is an AI-powered career intelligence platform designed for students, freshers, career switchers, and aspiring data professionals.

The platform combines **resume intelligence, ATS analysis, skill-gap analysis, job recommendations, salary intelligence, career assistance, and job-market analytics** into a single platform.

## 🚀 Live Application

### [Open AnalytixIndex](https://analytixindex-web.onrender.com)

The application is deployed with a separate frontend and backend architecture.

---

# ✨ Key Features

## 📄 Resume Analysis

Upload a resume and receive automated analysis including:

- Resume parsing
- Extracted technical skills
- Missing skills
- ATS compatibility score
- Resume summary
- Personalized recommendations

Supported formats include PDF and DOCX.

---

## 🎯 ATS Score

Analyze resume compatibility using an ATS-oriented scoring system.

The platform evaluates resume information and presents the result through an interactive dashboard.

---

## 🧠 Skill Gap Analysis

Identify the skills you already have and the skills you need to develop for your target career path.

The platform helps users understand:

- Current skills
- Missing skills
- Skill categories
- Career-relevant technologies
- Areas for improvement

---

## 💼 Job Recommendations

Get job-role recommendations based on the user's profile and extracted skills.

The recommendation system is designed around data-oriented career paths such as:

- Data Analyst
- Data Scientist
- Machine Learning Engineer
- Full Stack Developer
- Frontend Developer

---

## 💰 Salary Intelligence

Explore salary-related insights based on target roles and market information.

The Salary Predictor module provides estimated salary intelligence to help users understand potential compensation ranges.

---

## 📊 Market Intelligence

Analyze the data science and technology job market through:

- Hiring trends
- In-demand skills
- Role demand
- Salary trends
- Market insights
- Career opportunities

---

## 🤖 AI Career Coach

The Career Coach provides career-oriented assistance based on the user's profile, skills, and target role.

It can help with:

- Career direction
- Skill development
- Learning priorities
- Job preparation
- Professional growth

---

## 📚 Learning Recommendations

The platform recommends learning paths and resources based on identified skill gaps and career goals.

---

# 🏗️ System Architecture

```text
                        ┌─────────────────────────┐
                        │       User / Browser    │
                        └────────────┬────────────┘
                                     │
                                     ▼
                    ┌─────────────────────────────┐
                    │       Next.js Frontend      │
                    │     TypeScript + Tailwind   │
                    └────────────┬────────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────────┐
                    │       FastAPI Backend        │
                    │          Python              │
                    └────────────┬────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        Resume Analysis     Authentication     AI / Analytics
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────┐
                    │        PostgreSQL DB         │
                    └─────────────────────────────┘
