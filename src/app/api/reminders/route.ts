import { NextRequest, NextResponse } from "next/server";
import reminderService from "@/services/reminderService";

// Hardcoded test user ID
const TEST_USER_ID = "test-user-123";

/**
 * GET /api/reminders - Get all reminders for user
 */
export async function GET() {
  try {
    const reminders = await reminderService.getAll(TEST_USER_ID);
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { error: "Failed to fetch reminders" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reminders - Create a new reminder
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const reminder = await reminderService.create(body, TEST_USER_ID);
    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Failed to create reminder" },
      { status: 500 }
    );
  }
}
