import { Plan, UsageEventType } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { planConfig } from "../config/plans.js";
import { AppError } from "../middleware/error.js";

function startOfCurrentMonth() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export async function getUserUsage(userId: string) {
  const subscription = await prisma.subscription.findUnique({ where: { userId } });
  const plan = subscription?.plan ?? Plan.FREE;
  const monthStart = startOfCurrentMonth();

  const [ttsCharacters, apiRequests] = await Promise.all([
    prisma.usageEvent.aggregate({
      where: { userId, type: UsageEventType.TTS_CHARACTERS, createdAt: { gte: monthStart } },
      _sum: { quantity: true }
    }),
    prisma.usageEvent.aggregate({
      where: { userId, type: UsageEventType.API_REQUEST, createdAt: { gte: monthStart } },
      _sum: { quantity: true }
    })
  ]);

  const limits = planConfig[plan];

  return {
    plan,
    periodStart: monthStart,
    ttsCharactersUsed: ttsCharacters._sum.quantity ?? 0,
    ttsCharactersLimit: limits.monthlyCharacterLimit,
    apiRequestsUsed: apiRequests._sum.quantity ?? 0,
    apiRequestsLimit: limits.apiRequestLimit
  };
}

export async function assertCanUseTts(userId: string, characterCount: number) {
  const usage = await getUserUsage(userId);
  if (usage.ttsCharactersUsed + characterCount > usage.ttsCharactersLimit) {
    throw new AppError("Monthly TTS character limit exceeded", 402, usage);
  }
}

export async function recordUsage(userId: string, type: UsageEventType, quantity: number, metadata?: object) {
  return prisma.usageEvent.create({
    data: { userId, type, quantity, metadata }
  });
}
