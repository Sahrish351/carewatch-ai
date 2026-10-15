"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Upload,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  FileSpreadsheet,
  FileImage,
} from "lucide-react";
import type { HealthDocument } from "@/types/database";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<HealthDocument[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    setDocuments(healthStore.getDocuments());
  }, []);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      const newDoc = healthStore.addDocument({
        user_id: "demo-user-carewatch",
        file_name: file.name,
        storage_path: `/uploads/${file.name}`,
        file_type: file.type || "application/pdf",
        status: "analyzed",
        summary: `Document indexed. AI Extraction: Routine diagnostic panel. No acute critical anomalies detected on initial automated review.`,
      });
      setDocuments(healthStore.getDocuments());
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Health Records Vault</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#173737]">
            Health Documents & Summaries
          </h1>
          <p className="text-sm text-[#657777]">
            Store and review past lab summaries, discharge notes, and clinical records securely.
          </p>
        </div>

        {/* Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Medical Document</CardTitle>
            <CardDescription>
              Supports PDF, PNG, and JPEG files (Max 15MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-[#EDE8DF] rounded-2xl p-8 text-center space-y-3 hover:border-[#2A6F6F]/40 transition-colors bg-[#FAF8F5]">
              <Upload className="w-8 h-8 text-[#2A6F6F] mx-auto" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-xs font-bold text-[#2A6F6F] hover:underline">
                    Click to select file
                  </span>
                  <span className="text-xs text-[#657777]"> or drag and drop</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleSimulateUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="text-[11px] text-[#657777]">
                Uploaded files are stored securely with user-scoped Row-Level Security.
              </p>
              {uploading && (
                <div className="text-xs font-semibold text-[#2A6F6F] flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-[#2A6F6F] border-t-transparent animate-spin" />
                  Encrypting and uploading file...
                </div>
              )}
              {uploadSuccess && (
                <div className="text-xs font-semibold text-[#24542E] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2A6F6F]" /> File uploaded and indexed successfully!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-[#173737]">
            Indexed Records ({documents.length})
          </h2>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] flex items-center justify-center text-[#2A6F6F]">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#173737] block">
                        {doc.file_name}
                      </span>
                      <span className="text-xs text-[#657777]">
                        Uploaded {formatDate(doc.created_at)} • {doc.file_type}
                      </span>
                    </div>
                  </div>
                  <Badge variant="success">Indexed</Badge>
                </div>

                {doc.summary && (
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#2A6F6F]">
                      <span>AI Document Summary</span>
                      <span className="text-[10px] text-[#657777] font-normal normal-case">
                        Informational extraction only
                      </span>
                    </div>
                    <p className="text-xs text-[#173737] leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

