import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  const isKnown = error instanceof AppError;
  const statusCode = isKnown ? error.statusCode : 500;

  res.status(statusCode).json({
    error: {
      message: error.message || "Internal server error",
      statusCode,
      details: isKnown ? error.details : undefined
    }
  });
}
