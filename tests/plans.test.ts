import { describe, expect, it } from "vitest";
import { planConfig } from "../src/config/plans.js";

describe("plan configuration", () => {
  it("keeps paid plans above free usage limits", () => {
    expect(planConfig.PRO.monthlyCharacterLimit).toBeGreaterThan(planConfig.FREE.monthlyCharacterLimit);
    expect(planConfig.ENTERPRISE.monthlyCharacterLimit).toBeGreaterThan(planConfig.PRO.monthlyCharacterLimit);
  });
});
