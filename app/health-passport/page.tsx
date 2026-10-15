"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import {
  FileBadge2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Info,
  ShieldCheck,
} from "lucide-react";
import type { HealthPassport } from "@/types/database";

export default function HealthPassportPage() {
  const [passport, setPassport] = useState<HealthPassport | null>(null);
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [importantInfo, setImportantInfo] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const data = healthStore.getHealthPassport();
    setPassport(data);
    setImportantInfo(data.important_information || "");
  }, []);

  const addAllergy = () => {
    if (!newAllergy.trim() || !passport) return;
    const updated = {
      ...passport,
      allergies: [...passport.allergies, newAllergy.trim()],
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
    setNewAllergy("");
  };

  const removeAllergy = (index: number) => {
    if (!passport) return;
    const updated = {
      ...passport,
      allergies: passport.allergies.filter((_, i) => i !== index),
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
  };

  const addMedication = () => {
    if (!newMedication.trim() || !passport) return;
    const updated = {
      ...passport,
      medications: [...passport.medications, newMedication.trim()],
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
    setNewMedication("");
  };

  const removeMedication = (index: number) => {
    if (!passport) return;
    const updated = {
      ...passport,
      medications: passport.medications.filter((_, i) => i !== index),
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
  };

  const addCondition = () => {
    if (!newCondition.trim() || !passport) return;
    const updated = {
      ...passport,
      conditions: [...passport.conditions, newCondition.trim()],
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
    setNewCondition("");
  };

  const removeCondition = (index: number) => {
    if (!passport) return;
    const updated = {
      ...passport,
      conditions: passport.conditions.filter((_, i) => i !== index),
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
  };

  const handleSaveInfo = () => {
    if (!passport) return;
    const updated = {
      ...passport,
      important_information: importantInfo,
    };
    healthStore.updateHealthPassport(updated);
    setPassport(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!passport) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
            <FileBadge2 className="w-3.5 h-3.5" />
            <span>Voluntary Patient Record</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#173737]">
            Health Passport
          </h1>
          <p className="text-sm text-[#657777]">
            Store background context to assist your care journeys. You maintain full ownership and control over this data.
          </p>
        </div>

        {/* Clear Transparency Banner (Section 38 requirement) */}
        <div className="p-4 rounded-2xl bg-[#F0F7F7] border border-[#BDDEDC] flex items-start gap-3 text-xs text-[#2A6F6F]">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#173737]">Explicit Patient Control: </strong>
            All information in your Health Passport is strictly <strong>&quot;Provided by you&quot;</strong>. CareWatch does not silently infer or fabricate medical diagnoses from conversational snippets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allergies Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Known Allergies</CardTitle>
                <Badge variant="outline">Provided by you</Badge>
              </div>
              <CardDescription>Food, environmental, or medication allergies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                  placeholder="e.g. Penicillin, Peanuts"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                />
                <Button size="sm" type="button" onClick={addAllergy}>
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
              <div className="space-y-1.5 pt-1">
                {passport.allergies.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF] text-xs"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeAllergy(i)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Current Medications</CardTitle>
                <Badge variant="outline">Provided by you</Badge>
              </div>
              <CardDescription>Prescriptions, vitamins, or supplements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMedication()}
                  placeholder="e.g. Daily Multivitamin, Metformin"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                />
                <Button size="sm" type="button" onClick={addMedication}>
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
              <div className="space-y-1.5 pt-1">
                {passport.medications.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF] text-xs"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeMedication(i)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chronic Conditions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Existing Conditions</CardTitle>
                <Badge variant="outline">Provided by you</Badge>
              </div>
              <CardDescription>Diagnosed pre-existing health conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCondition()}
                  placeholder="e.g. Asthma, Hypertension"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                />
                <Button size="sm" type="button" onClick={addCondition}>
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
              <div className="space-y-1.5 pt-1">
                {passport.conditions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF] text-xs"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeCondition(i)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Information & Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Care Preferences & Context</CardTitle>
                <Badge variant="outline">Provided by you</Badge>
              </div>
              <CardDescription>Lifestyle, work habits, or communication needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <textarea
                rows={4}
                value={importantInfo}
                onChange={(e) => setImportantInfo(e.target.value)}
                placeholder="e.g. Prefers conservative supportive care when safe; works on computer screens 8 hours daily."
                className="w-full p-2.5 rounded-lg border border-[#EDE8DF] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 resize-none"
              />
              <div className="flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs text-[#24542E] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6F6F]" /> Saved
                  </span>
                ) : <span />}
                <Button size="sm" type="button" onClick={handleSaveInfo}>
                  <Save className="w-3.5 h-3.5 mr-1" /> Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

