"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout";
import { getUserSettings, updateUserSettings, exportUserData, deleteAccount, changePassword } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  Moon,
  Sun,
  Key,
  Download,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [profileName, setProfileName] = useState(user?.full_name || "Alex Chen");
  const [profileEmail, setProfileEmail] = useState(user?.email || "alex.chen@example.com");
  const [targetRole, setTargetRole] = useState(user?.target_role || "Data Scientist");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const s = await getUserSettings();
        setDarkMode(s.theme !== "light");
        setEmailNotifications(s.email_notifications === "true");
        setPushNotifications(s.job_alerts === "true");
        setDataSharing(s.privacy_mode === "public");
      } catch (err) {
        console.error(err);
      }
    }
    loadSettings();
  }, []);

  async function savePreferences() {
    setLoading(true);
    try {
      await updateUserSettings({
        theme: darkMode ? "dark" : "light",
        email_notifications: emailNotifications ? "true" : "false",
        job_alerts: pushNotifications ? "true" : "false",
        market_digest: "weekly",
        privacy_mode: dataSharing ? "public" : "private",
      });
      toast.success("Settings saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (!oldPass || !newPass) {
      toast.error("Please fill in both old and new password.");
      return;
    }
    try {
      await changePassword({ old_password: oldPass, new_password: newPass });
      toast.success("Password changed successfully!");
      setOldPass("");
      setNewPass("");
    } catch (err: any) {
      toast.error(err.message || "Password change failed");
    }
  }

  async function handleExport() {
    try {
      const data = await exportUserData();
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = `user_data_export_${user?.id || 1}.json`;
      link.click();
      toast.success("Data export downloaded!");
    } catch (err: any) {
      toast.error("Export failed");
    }
  }

  async function handleDeleteAccount() {
    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        await deleteAccount();
        toast.success("Account deleted.");
        logout();
      } catch (err: any) {
        toast.error("Account deletion failed.");
      }
    }
  }

  const Section = ({
    icon,
    title,
    description,
    onSave,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onSave: () => void;
    children: React.ReactNode;
  }) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const Toggle = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/40 p-4">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-violet-600" : "bg-slate-700"}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
            <Settings className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Configuration</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-slate-400">
            Manage your account preferences, notifications, security settings, and data privacy.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Notifications */}
          <Section
            icon={<Bell className="h-5 w-5 text-cyan-400" />}
            title="Notifications"
            description="Control alert digests and job recommendation updates"
            onSave={savePreferences}
          >
            <Toggle
              label="Email Notifications"
              description="Receive weekly market digests and ATS analysis results via email"
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <Toggle
              label="Job Alert Digest"
              description="Get immediate notifications when high-matching jobs are posted"
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
          </Section>

          {/* Appearance */}
          <Section
            icon={<Palette className="h-5 w-5 text-emerald-400" />}
            title="Appearance & Theme"
            description="Customize platform visual experience"
            onSave={savePreferences}
          >
            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(true)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition ${darkMode ? "border-violet-500 bg-violet-500/10 text-violet-300" : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"}`}
              >
                <Moon className="h-4 w-4" />
                Dark Theme
              </button>
              <button
                onClick={() => setDarkMode(false)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition ${!darkMode ? "border-violet-500 bg-violet-500/10 text-violet-300" : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"}`}
              >
                <Sun className="h-4 w-4" />
                Light Theme
              </button>
            </div>
          </Section>

          {/* Password Security */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <Key className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Security & Password</h2>
                <p className="text-sm text-slate-400">Update your account authentication credentials</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl text-xs transition-all"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Data Export */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Download className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Data Export & Backup</h2>
                <p className="text-sm text-slate-400">Download your platform activities, saved jobs, and profile</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Export all your uploaded resume metadata, ATS evaluation reports, bookmarked jobs, and skill gap roadmaps in JSON format.
            </p>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl text-xs transition-all"
            >
              <Download className="h-4 w-4 text-blue-400" />
              Export Platform JSON Archive
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Delete Account & Permanent Data Purge</p>
              <p className="text-xs text-slate-400">Permanently delete your profile, resume history, and saved items</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
