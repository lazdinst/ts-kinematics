import { forward } from "./forward";
import { Matrix } from "../../definitions";

describe("forward", () => {
  test("computes forward kinematics for a standard configuration", () => {
    const t1 = 0;
    const t2 = 0;
    const t3 = -Math.PI / 2;
    const t4 = Math.PI;
    const t5 = -Math.PI / 2;
    const t6 = 0;

    const config = {
      v1: 2.5,
      v2: 3,
      v3: 2.5,
      v4: 2.5,
      v5: 2.5,
      v6: 2,
    };

    const result = forward(t1, t2, t3, t4, t5, t6, config);

    const expected: Matrix = [
      [-1, 0, 0, 5],
      [0, -1, 0, 0],
      [0, 0, 1, 10],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles all joint angles set to zero", () => {
    const t1 = 0;
    const t2 = 0;
    const t3 = 0;
    const t4 = 0;
    const t5 = 0;
    const t6 = 0;

    const config = {
      v1: 1,
      v2: 1,
      v3: 1,
      v4: 1,
      v5: 1,
      v6: 1,
    };

    const result = forward(t1, t2, t3, t4, t5, t6, config);

    const expected: Matrix = [
      [1, 0, 0, 6],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles negative link lengths", () => {
    const t1 = Math.PI / 4;
    const t2 = -Math.PI / 2;
    const t3 = Math.PI / 6;
    const t4 = -Math.PI / 3;
    const t5 = Math.PI / 8;
    const t6 = -Math.PI / 9;

    const config = {
      v1: -2,
      v2: -3,
      v3: -2.5,
      v4: -2.5,
      v5: -2.5,
      v6: -2,
    };

    const result = forward(t1, t2, t3, t4, t5, t6, config);

    expect(result[3]).toEqual([0, 0, 0, 1]); // Ensure homogeneous row remains correct
  });

  test("handles a robot with a base offset", () => {
    const t1 = Math.PI / 6;
    const t2 = Math.PI / 4;
    const t3 = Math.PI / 3;
    const t4 = Math.PI / 2;
    const t5 = Math.PI / 8;
    const t6 = Math.PI / 9;

    const config = {
      v1: 1,
      v2: 1,
      v3: 1,
      v4: 1,
      v5: 1,
      v6: 1,
      base: 1.5,
    };

    const result = forward(t1, t2, t3, t4, t5, t6, config);

    // Check if the result accounts for the base offset
    expect(result[0][3]).toBeGreaterThan(0);
    expect(result[3]).toEqual([0, 0, 0, 1]); // Ensure homogeneous row remains correct
  });

  test("throws an error for invalid config", () => {
    expect(() =>
      forward(0, 0, 0, 0, 0, 0, { v1: 1, v2: 1, v3: 1, v4: 1 } as any)
    ).toThrow();
  });
});
