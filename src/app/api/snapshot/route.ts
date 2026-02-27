import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildSnapshot } from "@/services/snapshotService";

const DEV_USER_ID = "dev-user-1";

export async function GET() {
  const today = new Date();
  const snap = await buildSnapshot(DEV_USER_ID, today);
  return NextResponse.json(snap);
}

export async function DELETE() {
  // deletes today’s snapshot (optional)
  const d = new Date(); d.setHours(0,0,0,0);
  await prisma.executiveSnapshot.deleteMany({ where: { userId: DEV_USER_ID, date: d } });
  return NextResponse.json({ ok: true });
}