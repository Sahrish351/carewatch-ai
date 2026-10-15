import { NextResponse } from "next/server";
import { healthStore } from "@/lib/services/storage-service";

export async function POST() {
  healthStore.seedDemoScenario();
  return NextResponse.json({ success: true, message: "Demo scenario reset to initial 3-day headache follow-up due state." });
}

