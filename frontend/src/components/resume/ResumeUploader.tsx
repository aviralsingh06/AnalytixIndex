"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveResumeId } from "@/lib/constants";

import ResumeDropzone from "./ResumeDropzone";
import ResumePreview from "./ResumePreview";
import AnalysisLoader from "./AnalysisLoader";
import ATSScoreCard from "./ATSScoreCard";
import SkillsFound from "./SkillsFound";
import MissingSkills from "./MissingSkills";
import ResumeSummary from "./ResumeSummary";

interface Skill {
  skill_name: string;
  category: string;
}

interface ResumeAnalysisData {
  id: number;
  user_id: number;
  file_name: string;
  parsed_text: string;
  upload_date: string;

  ats_score: number;

  skills_found: number;
  skills: Skill[];

  missing_skills: string[];

  summary: string;

  recommendations: string[];
}

export default function ResumeUploader() {
  const [resume, setResume] = useState<File | null>(null);

  const [analysisData, setAnalysisData] =
    useState<ResumeAnalysisData | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisComplete, setAnalysisComplete] =
    useState(false);

  const [error, setError] =
    useState("");

  function handleFileSelect(file: File) {
    setResume(file);
    setAnalysisData(null);
    setAnalysisComplete(false);
    setError("");
  }

  function removeResume() {
    setResume(null);
    setAnalysisData(null);
    setAnalysisComplete(false);
    setError("");
  }

  async function analyzeResume() {
    if (!resume) return;

    try {
      setIsAnalyzing(true);
      setError("");

      const formData = new FormData();

      formData.append("file", resume);
      formData.append("user_id", "1");

      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error("================================");
        console.error("UPLOAD FAILED");
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        console.error("Backend Response:", errorText);
        console.error("================================");

        throw new Error(
          errorText || `HTTP ${response.status}`
        );
      }

      const data: ResumeAnalysisData = await response.json();

      console.log("================================");
      console.log("Resume Upload Success");
      console.log(data);
      console.log("================================");

      // Save the uploaded resume ID for ATS, Skill Gap,
      // Career Coach, Job Recommendations, etc.
      saveResumeId(data.id);

setAnalysisData(data);

      setAnalysisComplete(true);

    } catch (err: any) {
      console.error("Resume Upload Error:", err);

      setError(
        err?.message ||
        "Unable to analyze the resume."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-8">

      {!resume && (
        <ResumeDropzone
          onFileSelect={handleFileSelect}
        />
      )}

      {resume &&
        !isAnalyzing &&
        !analysisComplete && (
          <>
            <ResumePreview
              fileName={resume.name}
              fileSize={`${(
                resume.size /
                1024 /
                1024
              ).toFixed(2)} MB`}
              onRemove={removeResume}
            />

            <button
              onClick={analyzeResume}
              className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Analyze Resume
            </button>
          </>
        )}

      {isAnalyzing && (
        <AnalysisLoader />
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400 whitespace-pre-wrap">
          {error}
        </div>
      )}

      {analysisComplete &&
        analysisData && (
          <div className="space-y-8">

            <ATSScoreCard
              data={analysisData}
            />

            <SkillsFound
              data={analysisData}
            />

            <MissingSkills
              data={analysisData}
            />

            <ResumeSummary
              data={analysisData}
            />

          </div>
        )}

    </div>
  );
}