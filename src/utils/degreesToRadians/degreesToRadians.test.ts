import degreesToRadians from "./degreesToRadians";

describe("degreesToRadians", () => {
  test("converts 0 degrees to 0 radians", () => {
    expect(degreesToRadians(0)).toBe(0);
  });

  test("converts 90 degrees to π/2 radians", () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2, 6);
  });

  test("converts 180 degrees to π radians", () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI, 6);
  });

  test("converts 360 degrees to 2π radians", () => {
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI, 6);
  });

  test("handles negative degrees correctly", () => {
    expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2, 6);
    expect(degreesToRadians(-180)).toBeCloseTo(-Math.PI, 6);
  });

  test("handles small degree values correctly", () => {
    const degrees = 0.001;
    const expected = (degrees / 180) * Math.PI;
    expect(degreesToRadians(degrees)).toBeCloseTo(expected, 6);
  });

  test("handles large degree values correctly", () => {
    const degrees = 3600;
    const expected = (degrees / 180) * Math.PI;
    expect(degreesToRadians(degrees)).toBeCloseTo(expected, 6);
  });

  test("handles non-integer degrees correctly", () => {
    const degrees = 60; // 60 degrees = π/3 radians
    expect(degreesToRadians(degrees)).toBeCloseTo(Math.PI / 3, 6);
  });
});
