import prisma from "@/lib/prisma";

export type CreateAgendaInput = {
  date: Date | string;
  summary?: string;
  priorities?: string[];
};

export type UpdateAgendaInput = Partial<CreateAgendaInput>;

// Helper to serialize priorities array to JSON string
const serializePriorities = (priorities?: string[]): string | null => {
  if (!priorities || priorities.length === 0) return null;
  return JSON.stringify(priorities);
};

// Helper to deserialize priorities JSON string to array
const deserializePriorities = (priorities: string | null): string[] => {
  if (!priorities) return [];
  try {
    return JSON.parse(priorities);
  } catch {
    return [];
  }
};

// Transform agenda with parsed priorities
const transformAgenda = (agenda: { priorities: string | null; [key: string]: unknown }) => ({
  ...agenda,
  priorities: deserializePriorities(agenda.priorities),
});

export const agendaService = {
  /**
   * Get all agendas for a user
   */
  async getAll(userId: string) {
    const agendas = await prisma.agenda.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return agendas.map(transformAgenda);
  },

  /**
   * Get a single agenda by ID
   */
  async getById(id: string, userId: string) {
    const agenda = await prisma.agenda.findFirst({
      where: { id, userId },
    });
    return agenda ? transformAgenda(agenda) : null;
  },

  /**
   * Create a new agenda
   */
  async create(data: CreateAgendaInput, userId: string) {
    const agenda = await prisma.agenda.create({
      data: {
        date: new Date(data.date),
        summary: data.summary || null,
        priorities: serializePriorities(data.priorities),
        userId,
      },
    });
    return transformAgenda(agenda);
  },

  /**
   * Update an agenda
   */
  async update(id: string, data: UpdateAgendaInput, userId: string) {
    // Verify ownership first
    const existing = await prisma.agenda.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    const agenda = await prisma.agenda.update({
      where: { id },
      data: {
        ...(data.date !== undefined && { date: new Date(data.date) }),
        ...(data.summary !== undefined && { summary: data.summary }),
        ...(data.priorities !== undefined && {
          priorities: serializePriorities(data.priorities),
        }),
      },
    });
    return transformAgenda(agenda);
  },

  /**
   * Delete an agenda
   */
  async delete(id: string, userId: string) {
    // Verify ownership first
    const existing = await prisma.agenda.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return null;
    }

    const agenda = await prisma.agenda.delete({
      where: { id },
    });
    return transformAgenda(agenda);
  },
};

export default agendaService;
