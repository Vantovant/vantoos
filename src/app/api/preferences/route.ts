import { NextResponse } from "next/server";
import { userPreferenceService } from "@/services/userPreferenceService";

const DEV_USER_ID = "dev-user-1";

export async function GET() {
  const pref = await userPreferenceService.get(DEV_USER_ID);
  return NextResponse.json(pref ?? {});
}

export async function PUT(req: Request) {
  const body = await req.json();
  const pref = await userPreferenceService.upsert(DEV_USER_ID, body);
  return NextResponse.json(pref);
}

export async function DELETE() {
  await userPreferenceService.reset(DEV_USER_ID);
  return NextResponse.json({ ok: true });
}