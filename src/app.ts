import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { analyticsRouter } from "./routes/analytics.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { paymentsRouter } from "./routes/payments.routes.js";
import { subscriptionRouter } from "./routes/subscription.routes.js";
import { ttsRouter } from "./routes/tts.routes.js";
import { usageRouter } from "./routes/usage.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

  app.use(healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/subscriptions", subscriptionRouter);
  app.use("/api/payments", paymentsRouter);
  app.use("/api/tts", ttsRouter);
  app.use("/api/usage", usageRouter);
  app.use("/api/analytics", analyticsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
