import { buildSnapshot } from "@/services/snapshotService";
import { runExecutiveAgent } from "@/ai/aiGateway";
import { notificationService } from "@/services/notificationService";

export async function runDailyExecutiveAssistant(userId: string) {
  // 1) Build snapshot (small, cheap context)
  const snapshot = await buildSnapshot(userId);

  // 2) Call AI gateway (placeholder now; Lovable later)
  const aiResult = await runExecutiveAgent(snapshot);

  // 3) Optionally save outputs as notifications (still light)
  if (aiResult?.priorities?.length) {
    await notificationService.create(userId, {
      title: "Today’s priorities",
      message: aiResult.priorities.join(", "),
    });
  }

  return { snapshot, aiResult };
}