import prisma from "@/lib/prisma";

export type PreferenceInput = {
  timezone?: string;
  language?: string;
  theme?: "light" | "dark" | "system" | string;
  workingHoursStart?: string | null;
  workingHoursEnd?: string | null;
};

export const userPreferenceService = {
  async get(userId: string) {
    return prisma.userPreference.findUnique({ where: { userId } });
  },

  async upsert(userId: string, data: PreferenceInput) {
    return prisma.userPreference.upsert({
      where: { userId },
      create: {
        userId,
        timezone: data.timezone ?? "Africa/Johannesburg",
        language: data.language ?? "en",
        theme: data.theme ?? "system",
        workingHoursStart: data.workingHoursStart ?? null,
        workingHoursEnd: data.workingHoursEnd ?? null,
      },
      update: {
        timezone: data.timezone,
        language: data.language,
        theme: data.theme,
        workingHoursStart: data.workingHoursStart ?? undefined,
        workingHoursEnd: data.workingHoursEnd ?? undefined,
      },
    });
  },

  async reset(userId: string) {
    return prisma.userPreference.delete({ where: { userId } });
  },
};