import { buildHomogeneousMatrix } from "./buildHomogeneousMatrix";
import { Matrix } from "../../definitions";

describe("buildHomogeneousMatrix", () => {
  test("calculates the correct matrix for standard input", () => {
    const theta = Math.PI / 4; // 45 degrees
    const alpha = Math.PI / 6; // 30 degrees
    const r = 2;
    const d = 1;

    const result = buildHomogeneousMatrix([theta, alpha, r, d], 6);
    const expected: Matrix = [
      [0.707107, -0.353553, 0.612372, 1.414214],
      [0.707107, 0.353553, -0.612372, 1.414214],
      [0, 0.5, 0.866025, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles zero angles correctly", () => {
    const result = buildHomogeneousMatrix([0, 0, 1, 1], 6);
    const expected: Matrix = [
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles π/2 angles correctly", () => {
    const theta = Math.PI / 2; // 90 degrees
    const alpha = Math.PI / 2; // 90 degrees
    const result = buildHomogeneousMatrix([theta, alpha, 1, 1], 6);
    const expected: Matrix = [
      [0, -0, 1, 0],
      [1, 0, -0, 1],
      [0, 1, 0, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles negative distances correctly", () => {
    const result = buildHomogeneousMatrix(
      [Math.PI / 4, Math.PI / 6, -2, -1],
      6
    );
    const expected: Matrix = [
      [0.707107, -0.353553, 0.612372, -1.414214],
      [0.707107, 0.353553, -0.612372, -1.414214],
      [0, 0.5, 0.866025, -1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles very small angles", () => {
    const result = buildHomogeneousMatrix([1e-6, 1e-6, 1, 1], 6);
    const expected: Matrix = [
      [1, -1e-6, 1e-6, 1],
      [1e-6, 1, -1e-6, 1e-6],
      [0, 1e-6, 1, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles very large angles", () => {
    const result = buildHomogeneousMatrix([4 * Math.PI, Math.PI, 1, 1], 6);
    const expected: Matrix = [
      [1, 0, 0, 1],
      [0, -1, -1.22465e-16, 1.22465e-16],
      [0, 1.22465e-16, -1, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles all parameters as zero", () => {
    const result = buildHomogeneousMatrix([0, 0, 0, 0], 6);
    const expected: Matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles normalization and rounding correctly", () => {
    const result = buildHomogeneousMatrix([Math.PI / 4, Math.PI / 6, 1, 1], 4);
    const expected: Matrix = [
      [0.7071, -0.3536, 0.6124, 0.7071],
      [0.7071, 0.3536, -0.6124, 0.7071],
      [0, 0.5, 0.866, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });
});
