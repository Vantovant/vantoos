import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // Create test user
  const user = await prisma.user.upsert({
    where: { id: "test-user-123" },
    update: {},
    create: {
      id: "test-user-123",
      name: "Vanto",
      email: "vanto@vantoos.com",
    },
  });
  console.log("✅ Created user:", user.name);

  // Create 5 sample tasks with different priorities and statuses
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Complete project proposal",
        description: "Draft the Q1 project proposal and send for review",
        priority: "high",
        status: "inProgress",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        userId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Review pull requests",
        description: "Review pending PRs from the team",
        priority: "medium",
        status: "todo",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        userId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Update documentation",
        description: "Update API documentation with new endpoints",
        priority: "low",
        status: "todo",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        userId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Fix critical bug",
        description: "Address the login issue reported by users",
        priority: "high",
        status: "done",
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        userId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Team standup preparation",
        description: "Prepare notes for tomorrow's standup meeting",
        priority: "medium",
        status: "todo",
        autoScheduled: true,
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        userId: user.id,
      },
    }),
  ]);
  console.log(`✅ Created ${tasks.length} tasks`);

  // Create 3 sample reminders
  const reminders = await Promise.all([
    prisma.reminder.create({
      data: {
        title: "Call dentist for appointment",
        done: false,
        remindAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        userId: user.id,
      },
    }),
    prisma.reminder.create({
      data: {
        title: "Submit expense report",
        done: false,
        remindAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        userId: user.id,
      },
    }),
    prisma.reminder.create({
      data: {
        title: "Renew gym membership",
        done: true,
        remindAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        userId: user.id,
      },
    }),
  ]);
  console.log(`✅ Created ${reminders.length} reminders`);

  // Create 2 sample notes
  const notes = await Promise.all([
    prisma.note.create({
      data: {
        title: "Meeting Notes - Product Roadmap",
        content: `# Product Roadmap Q1 2026

## Key Priorities
- Launch new dashboard feature
- Improve mobile responsiveness
- Add dark mode support

## Timeline
- Week 1-2: Design phase
- Week 3-4: Development
- Week 5: Testing and QA
- Week 6: Release

## Notes
Remember to coordinate with the design team on the new color palette.`,
        userId: user.id,
      },
    }),
    prisma.note.create({
      data: {
        title: "Quick Ideas",
        content: `Random ideas to explore:
- Integrate with calendar APIs
- Add voice commands
- Implement AI-powered task suggestions
- Weekly summary emails`,
        userId: user.id,
      },
    }),
  ]);
  console.log(`✅ Created ${notes.length} notes`);

  // Create 1 agenda for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const agenda = await prisma.agenda.create({
    data: {
      date: today,
      summary: "Focus on completing the project proposal and reviewing PRs",
      priorities: JSON.stringify([
        "Complete project proposal draft",
        "Review 3 pending pull requests",
        "Attend team standup at 10 AM",
      ]),
      userId: user.id,
    },
  });
  console.log("✅ Created agenda for today");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - 1 User (${user.email})`);
  console.log(`   - ${tasks.length} Tasks`);
  console.log(`   - ${reminders.length} Reminders`);
  console.log(`   - ${notes.length} Notes`);
  console.log(`   - 1 Agenda`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
