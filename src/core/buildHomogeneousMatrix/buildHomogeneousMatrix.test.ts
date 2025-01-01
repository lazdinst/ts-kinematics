import { buildHomogeneousMatrix } from "./buildHomogeneousMatrix";
import { Matrix, DHParameters } from "../../definitions";

import {
  computeRotationRowX,
  computeRotationRowY,
} from "./buildHomogeneousMatrix";

describe("computeRotationRowX", () => {
  test("computes the correct X-axis rotation row for given parameters", () => {
    const theta = Math.PI / 4;
    const alpha = Math.PI / 6;
    const r = 2;

    const result = computeRotationRowX(theta, alpha, r);
    const expected = [
      Math.cos(theta),
      -Math.sin(theta) * Math.cos(alpha),
      Math.sin(theta) * Math.sin(alpha),
      r * Math.cos(theta), // Translation along X
    ];
    // const expected = [
    //   0.7071067811865476, -0.6123724356957945, 0.3535533905932737,
    //   1.4142135623730951,
    // ];
    expect(result).toEqual(expected);
  });
});

describe("computeRotationRowY", () => {
  test("computes the correct Y-axis rotation row for given parameters", () => {
    const theta = Math.PI / 4;
    const alpha = Math.PI / 6;
    const r = 2;

    const result = computeRotationRowY(theta, alpha, r);
    const expected = [
      Math.sin(theta),
      Math.cos(theta) * Math.cos(alpha),
      -Math.cos(theta) * Math.sin(alpha),
      r * Math.sin(theta),
    ];

    // const expected = [
    //   0.7071067811865475, 0.6123724356957946, -0.35355339059327373,
    //   1.414213562373095,
    // ];

    expect(result).toEqual(expected);
  });
});
describe("buildHomogeneousMatrix", () => {
  test("calculates the correct matrix for standard input", () => {
    const dhParams: DHParameters = {
      theta: Math.PI / 4, // 45 degrees
      alpha: Math.PI / 6, // 30 degrees
      r: 2,
      d: 1,
    };

    const result = buildHomogeneousMatrix(dhParams, 6);
    const expected: Matrix = [
      [0.707107, -0.612372, 0.353553, 1.414214],
      [0.707107, 0.612372, -0.353553, 1.414214],
      [0, 0.5, 0.866025, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles zero angles correctly", () => {
    const dhParams: DHParameters = {
      theta: 0,
      alpha: 0,
      r: 1,
      d: 1,
    };

    const result = buildHomogeneousMatrix(dhParams, 6);
    const expected: Matrix = [
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles π/2 angles correctly", () => {
    const dhParams: DHParameters = {
      theta: Math.PI / 2, // 90 degrees
      alpha: Math.PI / 2, // 90 degrees
      r: 1,
      d: 1,
    };

    const result = buildHomogeneousMatrix(dhParams, 6);
    const expected: Matrix = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles negative distances correctly", () => {
    const dhParams: DHParameters = {
      theta: Math.PI / 4,
      alpha: Math.PI / 6,
      r: -2,
      d: -1,
    };

    const result = buildHomogeneousMatrix(dhParams, 6);
    const expected: Matrix = [
      [0.707107, -0.612372, 0.353553, -1.414214],
      [0.707107, 0.612372, -0.353553, -1.414214],
      [0, 0.5, 0.866025, -1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles all parameters as zero", () => {
    const dhParams: DHParameters = {
      theta: 0,
      alpha: 0,
      r: 0,
      d: 0,
    };

    const result = buildHomogeneousMatrix(dhParams, 6);
    const expected: Matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles normalization and rounding correctly", () => {
    const dhParams: DHParameters = {
      theta: Math.PI / 4,
      alpha: Math.PI / 6,
      r: 1,
      d: 1,
    };

    const result = buildHomogeneousMatrix(dhParams, 4);
    const expected: Matrix = [
      [0.7071, -0.6124, 0.3536, 0.7071],
      [0.7071, 0.6124, -0.3536, 0.7071],
      [0, 0.5, 0.866, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });
});
