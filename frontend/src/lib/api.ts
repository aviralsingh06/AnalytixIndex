const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { ...getAuthHeaders(), ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const errorText = await res.text();
    let detail = `HTTP ${res.status}`;
    try {
      const parsed = JSON.parse(errorText);
      detail = parsed.detail || detail;
    } catch {
      detail = errorText || detail;
    }
    throw new Error(detail);
  }
  return res.json();
}

// ---- Auth ----
export async function registerUser(payload: any) {
  return request<any>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: any) {
  return request<any>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCurrentUser() {
  return request<any>("/auth/me");
}

export async function updateProfile(payload: any) {
  return request<any>("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function forgotPassword(email: string, newPassword: string) {
  return request<any>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email, new_password: newPassword }),
  });
}

// ---- Dashboard ----
export async function getDashboardOverview() {
  return request<any>("/dashboard/overview");
}

// ---- Resume ----
export async function uploadResume(file: File, userId: number = 1) {
  const form = new FormData();
  form.append("file", file);
  form.append("user_id", String(userId));

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers,
    body: form,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = await res.json();

  // Save the newly uploaded resume ID
  const resumeId =
    data.id ??
    data.resume_id ??
    data.resume?.id;

  if (resumeId) {
    localStorage.setItem(
      "latest_resume_id",
      String(resumeId)
    );
  }

  return data;
}

export async function getResumes(userId: number = 1) {
  return request<any[]>(`/resumes/${userId}`);
}

// ---- Skill Gap ----
export async function analyzeSkillGap(resumeId: number, targetRole: string) {
  return request<any>("/skill-gap/", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
  });
}

// ---- ATS ----
export async function getATSScore(resumeId: number, targetRole: string) {
  return request<any>("/ats-score", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
  });
}

// ---- Resume AI ----
export async function getResumeAI(resumeId: number, targetRole: string) {
  return request<any>("/resume-ai/", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
  });
}

// ---- Career Coach ----
export async function getCareerCoach(resumeId: number, targetRole: string) {
  return request<any>("/career-coach/", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
  });
}

export async function getInterviewPrep(role: string = "Data Scientist") {
  return request<any>(`/career-coach/interview-prep?role=${encodeURIComponent(role)}`);
}

// ---- Job Recommendation ----
export async function getJobRecommendations(resumeId: number, targetRole: string) {
  return request<any>("/job-recommendation", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
  });
}

export async function getFilteredJobs(params: { target_role?: string; work_type?: string; experience_level?: string } = {}) {
  const query = new URLSearchParams();
  if (params.target_role) query.append("target_role", params.target_role);
  if (params.work_type) query.append("work_type", params.work_type);
  if (params.experience_level) query.append("experience_level", params.experience_level);
  return request<any[]>(`/job-recommendation/jobs?${query.toString()}`);
}

export async function toggleSaveJob(jobId: number) {
  return request<any>(`/job-recommendation/jobs/save/${jobId}`, { method: "POST" });
}

export async function getSavedJobs() {
  return request<any[]>("/job-recommendation/jobs/saved");
}

// ---- Salary Prediction ----
export async function predictSalary(payload: { role: string; experience_years: number; education_level: string; location: string; skills: string[] }) {
  return request<any>("/salary/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---- Market Intelligence ----
export async function getMarketIntelligence() {
  return request<any>("/market-intelligence");
}

// ---- Settings ----
export async function getUserSettings() {
  return request<any>("/settings/");
}

export async function updateUserSettings(settings: any) {
  return request<any>("/settings/", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}

export async function changePassword(payload: any) {
  return request<any>("/settings/change-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function exportUserData() {
  return request<any>("/settings/export-data", {
    method: "POST",
  });
}

export async function deleteAccount() {
  return request<any>("/settings/delete-account", {
    method: "DELETE",
  });
}

// ---- Users ----
export async function createUser(fullName: string, email: string, password: string) {
  return request<any>("/users", {
    method: "POST",
    body: JSON.stringify({ full_name: fullName, email, password }),
  });
}

export async function getUsers() {
  return request<any[]>("/users");
}
