import prisma from "@/lib/prisma";

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

export async function buildSnapshot(userId: string, date = new Date()) {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const [ctx, stats, tasks, reminders, meetings] = await Promise.all([
    prisma.executiveContext.findUnique({ where: { userId } }),
    // reuse your existing stats logic if you have it; otherwise compute quick stats:
    prisma.task.findMany({ where: { userId, deletedAt: null } }),
    prisma.reminder.findMany({ where: { userId, deletedAt: null } }),
    prisma.meeting.findMany({
      where: {
        userId,
        deletedAt: null,
        startTime: { gte: dayStart, lte: dayEnd },
      },
      orderBy: { startTime: "asc" },
    }),
    prisma.task.findMany({
      where: { userId, deletedAt: null },
      orderBy: [{ priority: "desc" }, { dueDate: "asc" }],
      take: 10,
    }),
  ]);

  // Priority tasks: top 5 not done
  const priorityTasks = tasks
    .filter((t: any) => (t.status ?? "").toLowerCase() !== "done")
    .slice(0, 5)
    .map((t: any) => ({
      id: t.id,
      title: t.title,
      priority: t.priority,
      dueDate: t.dueDate,
      status: t.status,
    }));

  // Urgent reminders: due today and not done
  const urgentReminders = reminders
    .filter((r: any) => !r.done && r.remindAt && new Date(r.remindAt) >= dayStart && new Date(r.remindAt) <= dayEnd)
    .slice(0, 5)
    .map((r: any) => ({ id: r.id, title: r.title, remindAt: r.remindAt }));

  const meetingsToday = meetings.slice(0, 10).map((m: any) => ({
    id: m.id,
    title: m.title,
    startTime: m.startTime,
    endTime: m.endTime,
    location: m.location,
  }));

  const computedStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t: any) => (t.status ?? "").toLowerCase() === "done").length,
    pendingTasks: tasks.filter((t: any) => (t.status ?? "").toLowerCase() !== "done").length,
    meetingsToday: meetingsToday.length,
    remindersDueToday: urgentReminders.length,
  };

  const snapshotData = {
    userId,
    date: dayStart,
    weeklyFocus: ctx?.weeklyFocus ?? null,
    priorityTasks,
    meetingsToday,
    urgentReminders,
    stats: computedStats,
  };

  return prisma.executiveSnapshot.upsert({
    where: { userId_date: { userId, date: dayStart } },
    create: {
      userId,
      date: dayStart,
      weeklyFocus: snapshotData.weeklyFocus,
      priorityTasks: snapshotData.priorityTasks as any,
      meetingsToday: snapshotData.meetingsToday as any,
      urgentReminders: snapshotData.urgentReminders as any,
      stats: snapshotData.stats as any,
    },
    update: {
      weeklyFocus: snapshotData.weeklyFocus,
      priorityTasks: snapshotData.priorityTasks as any,
      meetingsToday: snapshotData.meetingsToday as any,
      urgentReminders: snapshotData.urgentReminders as any,
      stats: snapshotData.stats as any,
    },
  });
}