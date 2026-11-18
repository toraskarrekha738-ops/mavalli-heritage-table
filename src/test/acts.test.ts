import { describe, expect, it } from "vitest";
import { actIndex, dishPose } from "@/lib/acts";

describe("three acts scroll maths", () => {
  it("each dish turns exactly one full 360° across its act", () => {
    expect(dishPose(0, 0).rotationY).toBeCloseTo(0);
    expect(dishPose(0.9999, 2).rotationY).toBeCloseTo(Math.PI * 2, 2);
    expect(dishPose(1 / 6, 0).rotationY).toBeCloseTo(Math.PI);
  });
  it("splits the scroll into three acts", () => {
    expect(actIndex(0.1)).toBe(0);
    expect(actIndex(0.5)).toBe(1);
    expect(actIndex(1)).toBe(2);
  });
  it("hides a dish outside its act and stops rotation for reduced motion", () => {
    expect(dishPose(0.9, 0).visible).toBe(false);
    expect(dishPose(0.5, 1, true).rotationY).toBe(0);
  });
});
