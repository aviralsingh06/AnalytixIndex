export const JOB_ROLES = [
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "Data Engineer",
  "Business Analyst",
  "Python Developer",
  "Backend Developer",
  "Full Stack Developer",
];

export const RESUME_ID_STORAGE_KEY = "latest_resume_id";

export function getResumeId(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(RESUME_ID_STORAGE_KEY);

  if (!value) {
    return null;
  }

  const id = Number(value);

  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }

  return id;
}

export function saveResumeId(id: number) {
  if (typeof window !== "undefined" && id > 0) {
    localStorage.setItem(
      RESUME_ID_STORAGE_KEY,
      String(id)
    );
  }
}