import { NextResponse } from "next/server";
import { notificationService } from "@/services/notificationService";

const DEV_USER_ID = "dev-user-1";

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const updated = await notificationService.markRead(DEV_USER_ID, ctx.params.id, !!body.read);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, ctx: { params: { id: string } }) {
  const deleted = await notificationService.delete(DEV_USER_ID, ctx.params.id);
  return NextResponse.json(deleted);
}