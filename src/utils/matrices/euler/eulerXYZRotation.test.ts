import { eulerXYZRotation } from "./eulerXYZRotation";
import { normalizeMatrixZeros } from "../normalizeMatrixZeros";

describe("eulerXYZRotation", () => {
  test("calculates correct X-Y-Z rotation matrix for given angles", () => {
    const yaw = Math.PI / 4; // 45 degrees
    const pitch = Math.PI / 6; // 30 degrees
    const roll = Math.PI / 3; // 60 degrees

    const result = eulerXYZRotation(yaw, pitch, roll);

    const expected = normalizeMatrixZeros([
      [
        Math.cos(yaw) * Math.cos(pitch),
        Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) -
          Math.sin(yaw) * Math.cos(roll),
        Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) +
          Math.sin(yaw) * Math.sin(roll),
      ],
      [
        Math.sin(yaw) * Math.cos(pitch),
        Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) +
          Math.cos(yaw) * Math.cos(roll),
        Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) -
          Math.cos(yaw) * Math.sin(roll),
      ],
      [
        -Math.sin(pitch),
        Math.cos(pitch) * Math.sin(roll),
        Math.cos(pitch) * Math.cos(roll),
      ],
    ]);

    expect(result).toEqual(expected);
  });

  test("returns identity matrix when all angles are zero", () => {
    const result = eulerXYZRotation(0, 0, 0);

    const expected = normalizeMatrixZeros([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    expect(result).toEqual(expected);
  });

  test("handles negative angles correctly", () => {
    const result = eulerXYZRotation(-Math.PI / 4, -Math.PI / 6, -Math.PI / 3);

    expect(result).toBeTruthy(); // Ensure it runs without error
    expect(result).toHaveLength(3); // Ensure matrix dimensions
  });
});
