import { NextResponse } from "next/server";
import { notificationService } from "@/services/notificationService";

const DEV_USER_ID = "dev-user-1";

export async function GET() {
  const data = await notificationService.getAll(DEV_USER_ID);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await notificationService.create(DEV_USER_ID, {
    title: body.title,
    message: body.message ?? null,
  });
  return NextResponse.json(created);
}