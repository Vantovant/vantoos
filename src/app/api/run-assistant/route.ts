import { NextResponse } from "next/server";
import { runDailyExecutiveAssistant } from "@/ai/executiveOrchestrator";

const DEV_USER_ID = "dev-user-1";

export async function POST() {
  const result = await runDailyExecutiveAssistant(DEV_USER_ID);
  return NextResponse.json(result);
}