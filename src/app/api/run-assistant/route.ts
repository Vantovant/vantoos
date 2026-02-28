import { NextResponse } from "next/server";
import { runDailyExecutiveAssistant } from "@/ai/executiveOrchestrator";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const result = await runDailyExecutiveAssistant(
      {
        apiKey: process.env.OPENAI_API_KEY || "",
        baseUrl: "https://api.openai.com",
        model: "gpt-4o-mini"
      },
      {
        user: {
          name: "Vanto",
          email: "vanto@test.com",
          role: "Founder",
          directReports: [],
          vipContacts: []
        },

        tasks: body.tasks || [],
        emails: body.emails || [],
        calendar: body.calendar || [],
        goals: body.goals || [],

        recentCompletions: [],
        activeProjects: [],
        energyPattern: "morning"
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Assistant error:", error);

    return NextResponse.json(
      { error: "Assistant execution failed" },
      { status: 500 }
    );
  }
}