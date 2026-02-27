import prisma from "@/lib/prisma";

export type CreateReminderInput = {
  title: string;
  done?: boolean;
  remindAt?: Date | string;
};

export type UpdateReminderInput = Partial<CreateReminderInput>;

export const reminderService = {
  /**
   * Get all reminders for a user
   */
  async getAll(userId: string) {
    return prisma.reminder.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Get a single reminder by ID
   */
  async getById(id: string, userId: string) {
    return prisma.reminder.findFirst({
      where: { id, userId },
    });
  },

  /**
   * Create a new reminder
   */
  async create(data: CreateReminderInput, userId: string) {
    return prisma.reminder.create({
      data: {
        title: data.title,
        done: data.done || false,
        remindAt: data.remindAt ? new Date(data.remindAt) : null,
        userId,
      },
    });
  },

  /**
   * Update a reminder
   */
  async update(id: string, data: UpdateReminderInput, userId: string) {
    // Verify ownership first
    const existing = await prisma.reminder.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.reminder.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.done !== undefined && { done: data.done }),
        ...(data.remindAt !== undefined && {
          remindAt: data.remindAt ? new Date(data.remindAt) : null,
        }),
      },
    });
  },

  /**
   * Delete a reminder
   */
  async delete(id: string, userId: string) {
    // Verify ownership first
    const existing = await prisma.reminder.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.reminder.delete({
      where: { id },
    });
  },
};

export default reminderService;
