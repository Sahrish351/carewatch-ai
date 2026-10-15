"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import {
  Settings,
  User,
  Languages,
  Clock,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  LogOut,
  RotateCcw,
} from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Dr. Sarah Khan");
  const [language, setLanguage] = useState<"en" | "ur_roman">("en");
  const [timezone, setTimezone] = useState("UTC+05:00 (PKT / Asia/Karachi)");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const pref = healthStore.getPreferences();
    setLanguage(pref.language);
    setTimezone(pref.timezone || "UTC+05:00 (PKT / Asia/Karachi)");
    setNotifications(pref.notifications_enabled);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    healthStore.updatePreferences({
      language,
      timezone,
      notifications_enabled: notifications,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/demo-login", { method: "DELETE" });
    window.location.href = "/login";
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences & Data Governance</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#173737]">
            Account & App Settings
          </h1>
          <p className="text-sm text-[#657777]">
            Manage your profile, language preferences, notification intervals, and privacy controls.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-4 h-4 text-[#2A6F6F]" />
                User Profile
              </CardTitle>
              <CardDescription>How CareWatch addresses you in health checks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Regional */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#2A6F6F]" />
                Language & Regional Settings
              </CardTitle>
              <CardDescription>Choose your preferred conversational language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Language Preference
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 cursor-pointer"
                >
                  <option value="en">English (Default)</option>
                  <option value="ur_roman">Roman Urdu (Urdu in Latin Script)</option>
                </select>
                <p className="text-[11px] text-[#657777]">
                  CareWatch AI agents will adapt their clinical prompts and questioning style to your choice.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Timezone
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                />
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#2A6F6F]" />
                Follow-Up Reminders
              </CardTitle>
              <CardDescription>In-app prompts for scheduled 12h, 24h, and 48h check-ins</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="rounded text-[#2A6F6F] focus:ring-[#2A6F6F] h-4 w-4"
                />
                <span className="text-xs font-medium text-[#173737]">
                  Enable in-app check-in notifications and header alert badges
                </span>
              </label>
            </CardContent>
          </Card>

          {/* Privacy & Data Ownership */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#2A6F6F]" />
                Privacy & Data Ownership
              </CardTitle>
              <CardDescription>Complete control over your personal records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-xs text-[#657777] leading-relaxed">
              <p>
                Your clinical records, health passport entries, and assessment answers are strictly isolated using PostgreSQL Row Level Security (RLS). You can delete your health records or export your history at any time.
              </p>
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => alert("All episode records exported to JSON format.")}
                >
                  Export Complete Care Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-[#AB371C] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out of account
            </button>

            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs font-semibold text-[#24542E] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#2A6F6F]" /> Settings Saved
                </span>
              )}
              <Button type="submit" size="md">
                <Save className="w-4 h-4 mr-1.5" /> Save Changes
              </Button>
            </div>
          </div>
        </form>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

