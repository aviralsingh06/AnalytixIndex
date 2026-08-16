"use client";

import { useState } from "react";
import { analyzeSkillGap as analyzeSkillGapAPI } from "@/lib/api";
import { getResumeId } from "@/lib/constants";
import RoleSelector from "./RoleSelector";
import AnalyzeButton from "./AnalyzeButton";
import AnalysisLoader from "./AnalysisLoader";
import MatchScoreCard from "./MatchScoreCard";
import ExistingSkills from "./ExistingSkills";
import MissingSkills from "./MissingSkills";
import LearningRoadmap from "./LearningRoadmap";

export default function SkillGapPage() {

    const [selectedRole, setSelectedRole] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<any>(null);

    async function analyzeSkillGap() {
  if (!selectedRole) {
    alert("Select a target role.");
    return;
  }

  const resumeId = getResumeId();

  if (!resumeId) {
    alert("Please upload a resume first.");
    return;
  }

  setLoading(true);

  try {
    const data = await analyzeSkillGapAPI(
      resumeId,
      selectedRole
    );

    console.log("Skill Gap Response:", data);

    setResult(data);
  } catch (error: any) {
    console.error("Skill Gap Error:", error);

    alert(error.message || "Skill Gap Analysis Failed");
  } finally {
    setLoading(false);
  }
}

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-white">

                    Skill Gap Analysis

                </h1>

                <p className="mt-2 text-slate-400">

                    Compare your resume with a target role.

                </p>

            </div>

            <RoleSelector

                selectedRole={selectedRole}

                setSelectedRole={setSelectedRole}

            />

            <AnalyzeButton

                onAnalyze={analyzeSkillGap}

                disabled={loading}

                loading={loading}

            />

            {loading && <AnalysisLoader />}

            {result && (

                <>

                    <MatchScoreCard
                      score={result.match_percentage}
                      role={result.target_role}
                    />

                    <ExistingSkills skills={result.matched_required} />

                    <MissingSkills skills={result.missing_required} />

                    <LearningRoadmap roadmap={result.roadmap} />

                </>

            )}

        </div>

    );

}