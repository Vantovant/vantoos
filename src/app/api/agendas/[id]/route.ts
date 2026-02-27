import { NextRequest, NextResponse } from "next/server";
import agendaService from "@/services/agendaService";

// Hardcoded test user ID
const TEST_USER_ID = "test-user-123";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agendas/[id] - Get a single agenda
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const agenda = await agendaService.getById(id, TEST_USER_ID);

    if (!agenda) {
      return NextResponse.json(
        { error: "Agenda not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json(
      { error: "Failed to fetch agenda" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/agendas/[id] - Update an agenda
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const agenda = await agendaService.update(id, body, TEST_USER_ID);

    if (!agenda) {
      return NextResponse.json(
        { error: "Agenda not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Error updating agenda:", error);
    return NextResponse.json(
      { error: "Failed to update agenda" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/agendas/[id] - Delete an agenda
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const agenda = await agendaService.delete(id, TEST_USER_ID);

    if (!agenda) {
      return NextResponse.json(
        { error: "Agenda not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deleted: agenda });
  } catch (error) {
    console.error("Error deleting agenda:", error);
    return NextResponse.json(
      { error: "Failed to delete agenda" },
      { status: 500 }
    );
  }
}
