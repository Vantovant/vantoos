import { NextRequest, NextResponse } from "next/server";
import noteService from "@/services/noteService";

// Hardcoded test user ID
const TEST_USER_ID = "test-user-123";

/**
 * GET /api/notes - Get all notes for user
 */
export async function GET() {
  try {
    const notes = await noteService.getAll(TEST_USER_ID);
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notes - Create a new note
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await noteService.create(body, TEST_USER_ID);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
