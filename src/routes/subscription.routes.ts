import { Plan } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { planConfig } from "../config/plans.js";
import { prisma } from "../db/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const subscriptionRouter = Router();

const updatePlanSchema = z.object({ plan: z.nativeEnum(Plan) });

subscriptionRouter.get("/plans", (_req, res) => {
  res.json({ plans: Object.values(planConfig) });
});

subscriptionRouter.get(
  "/current",
  requireAuth,
  asyncHandler(async (req, res) => {
    const subscription = await prisma.subscription.findUnique({ where: { userId: req.user!.sub } });
    res.json({ subscription });
  })
);

subscriptionRouter.patch(
  "/current",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = updatePlanSchema.parse(req.body);
    const subscription = await prisma.subscription.upsert({
      where: { userId: req.user!.sub },
      update: { plan: payload.plan, renewedAt: new Date() },
      create: { userId: req.user!.sub, plan: payload.plan }
    });
    res.json({ subscription });
  })
);
