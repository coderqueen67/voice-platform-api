import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { getPlatformAnalytics } from "../services/analytics.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const analyticsRouter = Router();

analyticsRouter.get(
  "/platform",
  requireAuth,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const analytics = await getPlatformAnalytics();
    res.json({ analytics });
  })
);
