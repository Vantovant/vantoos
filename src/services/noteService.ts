import prisma from "@/lib/prisma";

export type CreateNoteInput = {
  title: string;
  content: string;
};

export type UpdateNoteInput = Partial<CreateNoteInput>;

export const noteService = {
  /**
   * Get all notes for a user
   */
  async getAll(userId: string) {
    return prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /**
   * Get a single note by ID
   */
  async getById(id: string, userId: string) {
    return prisma.note.findFirst({
      where: { id, userId },
    });
  },

  /**
   * Create a new note
   */
  async create(data: CreateNoteInput, userId: string) {
    return prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        userId,
      },
    });
  },

  /**
   * Update a note
   */
  async update(id: string, data: UpdateNoteInput, userId: string) {
    // Verify ownership first
    const existing = await prisma.note.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.note.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
      },
    });
  },

  /**
   * Delete a note
   */
  async delete(id: string, userId: string) {
    // Verify ownership first
    const existing = await prisma.note.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    return prisma.note.delete({
      where: { id },
    });
  },
};

export default noteService;
