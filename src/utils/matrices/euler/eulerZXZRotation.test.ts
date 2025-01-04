import { eulerZXZRotation } from "./eulerZXZRotation";
import { mapMatrix } from "../mapMatrix";
import { normalizeAndRoundValue } from "../../math/normalizeAndRoundValue";

describe("eulerZXZRotation", () => {
  test("calculates correct Z-X-Z rotation matrix for given angles", () => {
    const alpha = Math.PI / 4; // 45 degrees
    const beta = Math.PI / 6; // 30 degrees
    const gamma = Math.PI / 3; // 60 degrees

    const result = eulerZXZRotation(alpha, beta, gamma);

    const expected = [
      [
        Math.cos(alpha) * Math.cos(gamma) -
          Math.sin(alpha) * Math.cos(beta) * Math.sin(gamma),
        -Math.cos(alpha) * Math.sin(gamma) -
          Math.sin(alpha) * Math.cos(beta) * Math.cos(gamma),
        Math.sin(alpha) * Math.sin(beta),
      ],
      [
        Math.sin(alpha) * Math.cos(gamma) +
          Math.cos(alpha) * Math.cos(beta) * Math.sin(gamma),
        -Math.sin(alpha) * Math.sin(gamma) +
          Math.cos(alpha) * Math.cos(beta) * Math.cos(gamma),
        -Math.cos(alpha) * Math.sin(beta),
      ],
      [
        Math.sin(beta) * Math.sin(gamma),
        Math.sin(beta) * Math.cos(gamma),
        Math.cos(beta),
      ],
    ];

    const expectedResult = mapMatrix(expected, (value) =>
      normalizeAndRoundValue(value)
    );

    expect(result).toEqual(expectedResult);
  });

  test("returns identity matrix when all angles are zero", () => {
    const result = eulerZXZRotation(0, 0, 0);

    const expected = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles negative angles correctly", () => {
    const result = eulerZXZRotation(-Math.PI / 4, -Math.PI / 6, -Math.PI / 3);

    expect(result).toBeTruthy(); // Ensure it runs without error
    expect(result).toHaveLength(3); // Ensure matrix dimensions
  });
});
