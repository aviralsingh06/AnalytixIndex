class InterviewService:
    @staticmethod
    def get_questions(role: str = "Data Scientist"):
        questions = {
            "Python": [
                {
                    "id": 1,
                    "question": "Explain the difference between deep copy and shallow copy in Python.",
                    "category": "Python",
                    "difficulty": "Medium",
                    "answer_guide": "A shallow copy creates a new object but inserts references into it to the objects found in the original. A deep copy creates a new object and recursively inserts copies of the objects found in the original.",
                    "sample_code": "import copy\n\na = [[1, 2], [3, 4]]\nshallow = copy.copy(a)\ndeep = copy.deepcopy(a)"
                },
                {
                    "id": 2,
                    "question": "How do Python decorators work under the hood?",
                    "category": "Python",
                    "difficulty": "Intermediate",
                    "answer_guide": "Decorators are callable objects (functions or classes) that wrap another function to modify its behavior without permanently altering the original function logic.",
                    "sample_code": "def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        print('Before call')\n        res = func(*args, **kwargs)\n        print('After call')\n        return res\n    return wrapper"
                }
            ],
            "SQL": [
                {
                    "id": 3,
                    "question": "What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL window functions?",
                    "category": "SQL",
                    "difficulty": "Intermediate",
                    "answer_guide": "ROW_NUMBER assigns consecutive integers. RANK leaves gaps when values tie (1, 2, 2, 4). DENSE_RANK does not leave gaps (1, 2, 2, 3).",
                    "sample_code": "SELECT employee_id, salary,\n  RANK() OVER (ORDER BY salary DESC) as rank_sal,\n  DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank_sal\nFROM employees;"
                },
                {
                    "id": 4,
                    "question": "Write a query to find the 2nd highest salary from an Employees table.",
                    "category": "SQL",
                    "difficulty": "Medium",
                    "answer_guide": "Use subqueries, CTEs, or OFFSET 1 with ORDER BY salary DESC LIMIT 1.",
                    "sample_code": "WITH RankedSalaries AS (\n  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM employees\n)\nSELECT salary FROM RankedSalaries WHERE rnk = 2 LIMIT 1;"
                }
            ],
            "Machine Learning": [
                {
                    "id": 5,
                    "question": "How do you handle severe class imbalance in a classification dataset?",
                    "category": "Machine Learning",
                    "difficulty": "Advanced",
                    "answer_guide": "Use SMOTE / ADASYN oversampling, random undersampling, cost-sensitive learning (class_weight='balanced'), and evaluate using PR-AUC or F1-score instead of Accuracy.",
                    "sample_code": "from imblearn.over_sampling import SMOTE\nsmote = SMOTE(random_state=42)\nX_res, y_res = smote.fit_resample(X, y)"
                },
                {
                    "id": 6,
                    "question": "What is bias-variance tradeoff and how do L1 and L2 regularization impact it?",
                    "category": "Machine Learning",
                    "difficulty": "Intermediate",
                    "answer_guide": "High bias leads to underfitting; high variance leads to overfitting. L1 (Lasso) forces sparse weights (feature selection), while L2 (Ridge) shrinks weights towards zero, reducing variance.",
                    "sample_code": "from sklearn.linear_model import Ridge, Lasso\nridge = Ridge(alpha=1.0)\nlasso = Lasso(alpha=0.1)"
                }
            ],
            "HR & Behavioral": [
                {
                    "id": 7,
                    "question": "Describe a situation where your machine learning model failed in production. How did you resolve it?",
                    "category": "HR & Behavioral",
                    "difficulty": "General",
                    "answer_guide": "Use the STAR method (Situation, Task, Action, Result). Mention data drift detection, monitoring metrics, rollback strategy, and retrained models.",
                    "sample_code": None
                }
            ]
        }
        return questions
