import { randomUUID } from "node:crypto";
import { TtsJobStatus, UsageEventType } from "@prisma/client";
import { env } from "../config/env.js";
import { prisma } from "../db/prisma.js";
import { assertCanUseTts, recordUsage } from "./usage.service.js";

export async function createTtsJob(input: { userId: string; text: string; voice?: string }) {
  const characterCount = input.text.trim().length;
  await assertCanUseTts(input.userId, characterCount);

  const job = await prisma.ttsJob.create({
    data: {
      userId: input.userId,
      text: input.text,
      characterCount,
      voice: input.voice ?? env.DEFAULT_TTS_VOICE,
      status: TtsJobStatus.COMPLETED,
      completedAt: new Date(),
      audioUrl: `https://example.com/mock-audio/${randomUUID()}.mp3`
    }
  });

  await Promise.all([
    recordUsage(input.userId, UsageEventType.TTS_CHARACTERS, characterCount, { ttsJobId: job.id }),
    recordUsage(input.userId, UsageEventType.API_REQUEST, 1, { route: "POST /api/tts/jobs" })
  ]);

  return job;
}

export async function listTtsJobs(userId: string) {
  return prisma.ttsJob.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 25
  });
}
