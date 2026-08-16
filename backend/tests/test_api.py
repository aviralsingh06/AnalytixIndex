import unittest
from fastapi.testclient import TestClient
from main import app


class TestBackendAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("version", response.json())

    def test_health_endpoint(self):
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)

    def test_dashboard_overview(self):
        response = self.client.get("/api/v1/dashboard/overview")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("career_readiness_score", data)
        self.assertIn("ats_score", data)
        self.assertIn("stats", data)

    def test_market_intelligence(self):
        response = self.client.get("/api/v1/market-intelligence")
        self.assertEqual(response.status_code, 200)

    def test_job_recommendation_list(self):
        response = self.client.get("/api/v1/job-recommendation/jobs")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_interview_prep(self):
        response = self.client.get("/api/v1/career-coach/interview-prep")
        self.assertEqual(response.status_code, 200)
        self.assertIn("categories", response.json())

    def test_salary_prediction(self):
        payload = {
            "role": "Data Scientist",
            "experience_years": 4,
            "education_level": "Master's",
            "location": "San Francisco, CA",
            "skills": ["Python", "SQL", "PyTorch"]
        }
        response = self.client.post("/api/v1/salary/predict", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("predicted_salary", data)
        self.assertGreater(data["predicted_salary"], 100000)


if __name__ == "__main__":
    unittest.main()
