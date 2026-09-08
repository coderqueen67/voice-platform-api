import { Plan } from "@prisma/client";

export type PlanConfig = {
  name: Plan;
  monthlyPriceCents: number;
  monthlyCharacterLimit: number;
  apiRequestLimit: number;
  supportLevel: "community" | "standard" | "priority";
};

export const planConfig: Record<Plan, PlanConfig> = {
  FREE: {
    name: "FREE",
    monthlyPriceCents: 0,
    monthlyCharacterLimit: 10000,
    apiRequestLimit: 1000,
    supportLevel: "community"
  },
  PRO: {
    name: "PRO",
    monthlyPriceCents: 1900,
    monthlyCharacterLimit: 250000,
    apiRequestLimit: 25000,
    supportLevel: "standard"
  },
  ENTERPRISE: {
    name: "ENTERPRISE",
    monthlyPriceCents: 9900,
    monthlyCharacterLimit: 5000000,
    apiRequestLimit: 500000,
    supportLevel: "priority"
  }
};
