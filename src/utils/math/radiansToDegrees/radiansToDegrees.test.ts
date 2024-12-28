import radiansToDegrees from "./radiansToDegrees";

describe("radiansToDegrees", () => {
  test("converts 0 radians to 0 degrees", () => {
    expect(radiansToDegrees(0)).toBe(0);
  });

  test("converts π/2 radians to 90 degrees", () => {
    expect(radiansToDegrees(Math.PI / 2)).toBe(90);
  });

  test("converts π radians to 180 degrees", () => {
    expect(radiansToDegrees(Math.PI)).toBe(180);
  });

  test("converts 2π radians to 360 degrees", () => {
    expect(radiansToDegrees(2 * Math.PI)).toBe(360);
  });

  test("handles negative radians correctly", () => {
    expect(radiansToDegrees(-Math.PI)).toBe(-180);
    expect(radiansToDegrees(-Math.PI / 2)).toBe(-90);
  });

  test("handles small radian values correctly", () => {
    const radian = 0.001;
    const expected = 180 * (radian / Math.PI);
    expect(radiansToDegrees(radian)).toBeCloseTo(expected, 6); // Precision up to 6 decimal places
  });

  test("handles large radian values correctly", () => {
    const radian = 10 * Math.PI;
    const expected = 180 * (radian / Math.PI);
    expect(radiansToDegrees(radian)).toBe(expected);
  });

  test("handles non-integer radians correctly", () => {
    const radian = Math.PI / 3; // 60 degrees
    expect(radiansToDegrees(radian)).toBeCloseTo(60, 6);
  });
});
