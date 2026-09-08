import { prisma } from "../db/prisma.js";

export async function getPlatformAnalytics() {
  const [users, ttsJobs, payments, subscriptionsByPlan, usage] = await Promise.all([
    prisma.user.count(),
    prisma.ttsJob.count(),
    prisma.payment.groupBy({ by: ["status"], _count: { _all: true }, _sum: { amountCents: true } }),
    prisma.subscription.groupBy({ by: ["plan"], _count: { _all: true } }),
    prisma.usageEvent.aggregate({ _sum: { quantity: true } })
  ]);

  return {
    totalUsers: users,
    totalTtsJobs: ttsJobs,
    payments,
    subscriptionsByPlan,
    totalTrackedUsageQuantity: usage._sum.quantity ?? 0
  };
}
