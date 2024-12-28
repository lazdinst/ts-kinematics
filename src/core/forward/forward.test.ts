import { forward } from "./forward";
import { Matrix } from "../../definitions";

describe("forward", () => {
  /**
   * Test Case 1:
   * Robot configuration:
   *     |
   *    [ ]
   *     |
   *    ( )
   *     |
   *    [ ]
   *     |
   *    ( )
   *     |
   *    ( )
   *     |
   *    [ ]
   *
   * The robot is fully extended in the Z direction, with no rotations applied.
   */
  test("computes forward kinematics for zero joint angles", () => {
    const t1 = 0;
    const t2 = 0;
    const t3 = 0;
    const t4 = 0;
    const t5 = 0;
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
      [1, 0, 0, 0], // No rotation; end-effector is along Z-axis
      [0, 1, 0, 0], // No rotation in Y-axis
      [0, 0, 1, 15], // Full extension along Z-axis (sum of v1 to v6)
      [0, 0, 0, 1], // Homogeneous row
    ];

    expect(result).toEqual(expected);
  });

  /**
   * Test Case 2:
   * Robot configuration:
   *                  [ ]
   *                   |
   *    ( ) -- [ ] -- ( )
   *     |
   *    ( )
   *     |
   *    [ ]
   *
   * The end-effector has a 180-degree rotation about the Z-axis and
   * is partially extended along the X-axis.
   */
  test("computes forward kinematics for nonzero joint angles", () => {
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
      [-1, 0, 0, 5], // Rotation about Z-axis; translation along X-axis
      [0, -1, 0, 0], // Rotation about Y-axis
      [0, 0, 1, 10], // Partial extension along Z-axis
      [0, 0, 0, 1], // Homogeneous row
    ];

    expect(result).toEqual(expected);
  });

  /**
   * Test Case 3:
   * Robot configuration:
   *    [ ]
   *     |
   *    [ ] -- ( ) -- ( )
   *                   |
   *                  ( )
   *                   |
   *                  [ ]
   *
   * The robot has rotations applied to all joints, creating a complex pose.
   */
  test("handles complex joint configurations", () => {
    const t1 = Math.PI / 2;
    const t2 = -Math.PI / 4;
    const t3 = Math.PI / 3;
    const t4 = -Math.PI / 6;
    const t5 = Math.PI / 8;
    const t6 = -Math.PI / 9;

    const config = {
      v1: 1,
      v2: 2,
      v3: 1.5,
      v4: 2,
      v5: 1.5,
      v6: 1,
    };

    const result = forward(t1, t2, t3, t4, t5, t6, config);

    // Verify homogeneous row remains valid
    expect(result[3]).toEqual([0, 0, 0, 1]);
  });

  /**
   * Test Case 4:
   * Robot configuration:
   * Robot with a base offset applied.
   */
  test("accounts for base offset in configuration", () => {
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

    // Verify base offset affects translation
    expect(result[0][3]).toBeGreaterThan(0); // X position
    expect(result[3]).toEqual([0, 0, 0, 1]); // Homogeneous row remains valid
  });

  /**
   * Test Case 5:
   * Invalid configuration:
   * Throws an error for incomplete configuration.
   */
  test("throws an error for invalid robot configuration", () => {
    expect(() =>
      forward(0, 0, 0, 0, 0, 0, { v1: 1, v2: 1, v3: 1, v4: 1 } as any)
    ).toThrow();
  });
});
