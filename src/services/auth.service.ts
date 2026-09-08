import { Plan } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { AppError } from "../middleware/error.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signAccessToken } from "../utils/tokens.js";

export async function registerUser(input: { email: string; password: string; name?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
      passwordHash,
      subscription: {
        create: { plan: Plan.FREE }
      }
    },
    include: { subscription: true }
  });

  const token = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    include: { subscription: true }
  });

  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUser(user);
}

function sanitizeUser<T extends { passwordHash: string }>(user: T) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}
