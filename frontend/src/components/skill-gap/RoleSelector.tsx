"use client";

interface RoleSelectorProps {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const roles = [
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "Business Analyst",
  "Data Engineer",
  "AI Engineer",
];

export default function RoleSelector({
  selectedRole,
  setSelectedRole,
}: RoleSelectorProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

      <h2 className="text-2xl font-bold text-white">
        Target Job Role
      </h2>

      <p className="mt-2 text-slate-400">
        Select the job role you want your resume to be compared against.
      </p>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
      >
        <option value="">
          Choose a Role
        </option>

        {roles.map((role) => (
          <option
            key={role}
            value={role}
          >
            {role}
          </option>
        ))}
      </select>

    </div>
  );
}