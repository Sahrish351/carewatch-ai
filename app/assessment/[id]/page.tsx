"use client";

import { useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

function AssessmentRedirect() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      router.replace(`/assessment/${id}/result`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
      <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AssessmentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AssessmentRedirect />
    </Suspense>
  );
}
