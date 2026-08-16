"use client";

import { FileText, Calendar, HardDrive, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  onRemove?: () => void;
}

export default function ResumePreview({
  fileName = "Aviral_Resume.pdf",
  fileSize = "1.8 MB",
  uploadedAt = new Date().toLocaleString(),
  onRemove,
}: ResumePreviewProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-violet-600/20 p-4">

          <FileText className="h-10 w-10 text-violet-400" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Uploaded Resume
          </h2>

          <p className="text-slate-400">
            Your selected resume is ready for AI analysis.
          </p>

        </div>

      </div>

      {/* File Card */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-6">

        <h3 className="truncate text-xl font-semibold text-white">
          {fileName}
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="flex items-center gap-3">

            <HardDrive className="h-5 w-5 text-cyan-400" />

            <div>

              <p className="text-sm text-slate-500">
                File Size
              </p>

              <p className="font-medium text-white">
                {fileSize}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Calendar className="h-5 w-5 text-emerald-400" />

            <div>

              <p className="text-sm text-slate-500">
                Uploaded
              </p>

              <p className="font-medium text-white">
                {uploadedAt}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap gap-4">

        <Button
          variant="outline"
          className="border-slate-700 bg-slate-900/60 hover:bg-slate-800"
        >
          <Eye className="mr-2 h-5 w-5" />
          Preview
        </Button>

        <Button
          variant="destructive"
          onClick={onRemove}
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Remove
        </Button>

      </div>

    </section>
  );
}