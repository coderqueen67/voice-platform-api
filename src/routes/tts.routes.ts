import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { createTtsJob, listTtsJobs } from "../services/tts.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const ttsRouter = Router();

const createTtsSchema = z.object({
  text: z.string().min(1).max(10000),
  voice: z.string().min(1).optional()
});

ttsRouter.post(
  "/jobs",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = createTtsSchema.parse(req.body);
    const job = await createTtsJob({ userId: req.user!.sub, ...payload });
    res.status(201).json({ job });
  })
);

ttsRouter.get(
  "/jobs",
  requireAuth,
  asyncHandler(async (req, res) => {
    const jobs = await listTtsJobs(req.user!.sub);
    res.json({ jobs });
  })
);
