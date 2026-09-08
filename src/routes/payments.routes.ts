import { PaymentStatus, Plan, UsageEventType } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { planConfig } from "../config/plans.js";
import { prisma } from "../db/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { recordUsage } from "../services/usage.service.js";

export const paymentsRouter = Router();

const checkoutSchema = z.object({
  plan: z.enum([Plan.PRO, Plan.ENTERPRISE]),
  success: z.boolean().default(true)
});

paymentsRouter.post(
  "/checkout/mock",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = checkoutSchema.parse(req.body);
    const amountCents = planConfig[payload.plan].monthlyPriceCents;
    const status = payload.success ? PaymentStatus.SUCCEEDED : PaymentStatus.FAILED;

    const payment = await prisma.payment.create({
      data: {
        userId: req.user!.sub,
        amountCents,
        status,
        description: `${payload.plan} monthly subscription mock checkout`
      }
    });

    if (status === PaymentStatus.SUCCEEDED) {
      await prisma.subscription.upsert({
        where: { userId: req.user!.sub },
        update: { plan: payload.plan, renewedAt: new Date() },
        create: { userId: req.user!.sub, plan: payload.plan }
      });
    }

    await recordUsage(req.user!.sub, UsageEventType.PAYMENT_EVENT, 1, { paymentId: payment.id, status });
    res.status(201).json({ payment });
  })
);

paymentsRouter.get(
  "/history",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user!.sub },
      orderBy: { createdAt: "desc" },
      take: 25
    });
    res.json({ payments });
  })
);
