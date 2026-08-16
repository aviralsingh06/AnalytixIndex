import { AppLayout } from "@/components/layout";
import { ResumeUploader } from "@/components/resume";

export default function ResumePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Resume Analysis
          </h1>

          <p className="mt-2 text-slate-400">
            Upload your resume and receive an ATS score,
            extracted skills, missing skills and AI-powered
            recommendations.
          </p>

        </div>

        <ResumeUploader />

      </div>
    </AppLayout>
  );
}