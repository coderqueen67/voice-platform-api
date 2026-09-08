import type { NextFunction, Request, Response } from "express";
import { AppError } from "./error.js";
import { verifyAccessToken, type JwtPayload } from "../utils/tokens.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new AppError("Missing or invalid Authorization header", 401);
  }

  const token = header.replace("Bearer ", "").trim();
  req.user = verifyAccessToken(token);
  next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }
  next();
}
