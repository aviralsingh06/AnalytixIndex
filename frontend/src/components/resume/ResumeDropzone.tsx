"use client";

import { useRef } from "react";

import { UploadCloud, FileText } from "lucide-react";

interface ResumeDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function ResumeDropzone({
  onFileSelect,
}: ResumeDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or Word documents are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    onFileSelect(file);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    handleFile(file);
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="
        group
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-violet-500/30
        bg-slate-900/60
        p-14
        text-center
        transition-all
        duration-300
        hover:border-violet-500
        hover:bg-slate-900
      "
      onClick={() => inputRef.current?.click()}
    >
      <UploadCloud
        className="
          h-16
          w-16
          text-violet-400
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />

      <h2 className="mt-6 text-2xl font-bold text-white">
        Drag & Drop your Resume
      </h2>

      <p className="mt-3 max-w-lg text-slate-400">
        Upload your resume to receive an ATS score,
        extract skills, identify missing technologies,
        and get personalized career recommendations.
      </p>

      <button
        className="
          mt-8
          rounded-xl
          bg-violet-600
          px-8
          py-3
          font-semibold
          text-white
          transition
          hover:bg-violet-700
        "
      >
        Browse Files
      </button>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <FileText className="h-4 w-4" />
        PDF • DOC • DOCX • Max 5 MB
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={handleInputChange}
      />
    </div>
  );
}