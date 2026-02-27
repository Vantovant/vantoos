import prisma from "@/lib/prisma";

export const notificationService = {
  async getAll(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(userId: string, data: { title: string; message?: string | null }) {
    return prisma.notification.create({
      data: { userId, title: data.title, message: data.message ?? null },
    });
  },

  async markRead(userId: string, id: string, read: boolean) {
    return prisma.notification.update({
      where: { id },
      data: { read },
    });
  },

  async delete(userId: string, id: string) {
    // Optional: verify ownership
    const n = await prisma.notification.findUnique({ where: { id } });
    if (!n || n.userId !== userId) throw new Error("Not found");
    return prisma.notification.delete({ where: { id } });
  },
};