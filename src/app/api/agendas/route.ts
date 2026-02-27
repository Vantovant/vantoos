import { NextRequest, NextResponse } from "next/server";
import agendaService from "@/services/agendaService";

// Hardcoded test user ID
const TEST_USER_ID = "test-user-123";

/**
 * GET /api/agendas - Get all agendas for user
 */
export async function GET() {
  try {
    const agendas = await agendaService.getAll(TEST_USER_ID);
    return NextResponse.json(agendas);
  } catch (error) {
    console.error("Error fetching agendas:", error);
    return NextResponse.json(
      { error: "Failed to fetch agendas" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agendas - Create a new agenda
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.date) {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      );
    }

    const agenda = await agendaService.create(body, TEST_USER_ID);
    return NextResponse.json(agenda, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json(
      { error: "Failed to create agenda" },
      { status: 500 }
    );
  }
}
