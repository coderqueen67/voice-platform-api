import { Plan } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { hashPassword } from "../utils/password.js";

async function main() {
  const passwordHash = await hashPassword("DemoPass123!");

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      passwordHash,
      subscription: { create: { plan: Plan.ENTERPRISE } }
    }
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      passwordHash,
      subscription: { create: { plan: Plan.PRO } }
    }
  });

  console.log({ admin: admin.email, demo: demo.email, password: "DemoPass123!" });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
