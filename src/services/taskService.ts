import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type CreateTaskInput = {
  title: string;
  description?: string;
  priority?: "high" | "medium" | "low";
  dueDate?: Date | string;
  status?: "todo" | "inProgress" | "done";
  autoScheduled?: boolean;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;

export const taskService = {
  /**
   * Get all tasks for a user
   */
  async getAll(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Get a single task by ID
   */
  async getById(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  },

  /**
   * Create a new task
   */
  async create(data: CreateTaskInput, userId: string) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority || "medium",
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        status: data.status || "todo",
        autoScheduled: data.autoScheduled || false,
        userId,
      },
    });
  },

  /**
   * Update a task
   */
  async update(id: string, data: UpdateTaskInput, userId: string) {
    // Verify ownership first
    const existing = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.dueDate !== undefined && {
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.autoScheduled !== undefined && { autoScheduled: data.autoScheduled }),
      },
    });
  },

  /**
   * Delete a task
   */
  async delete(id: string, userId: string) {
    // Verify ownership first
    const existing = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.task.delete({
      where: { id },
    });
  },
};

export default taskService;
