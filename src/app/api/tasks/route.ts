import { NextRequest, NextResponse } from "next/server";
import taskService from "@/services/taskService";

// Hardcoded test user ID
const TEST_USER_ID = "test-user-123";

/**
 * GET /api/tasks - Get all tasks for user
 */
export async function GET() {
  try {
    const tasks = await taskService.getAll(TEST_USER_ID);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks - Create a new task
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

    const task = await taskService.create(body, TEST_USER_ID);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
