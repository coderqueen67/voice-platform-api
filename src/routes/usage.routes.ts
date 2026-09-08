import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getUserUsage } from "../services/usage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const usageRouter = Router();

usageRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const usage = await getUserUsage(req.user!.sub);
    res.json({ usage });
  })
);
