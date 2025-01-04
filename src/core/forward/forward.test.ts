import { forward } from "./forward";
import { Matrix } from "../../definitions";
import { ForwardKinematicsArgs, RobotConfig } from "../../definitions";

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
    const config: RobotConfig = {
      v1: 2.5,
      v2: 3,
      v3: 2.5,
      v4: 2.5,
      v5: 2.5,
      v6: 2,
    };

    const args: ForwardKinematicsArgs = {
      theta1: 0,
      theta2: 0,
      theta3: 0,
      theta4: 0,
      theta5: 0,
      theta6: 0,
      config,
    };

    const result = forward(args);

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
    const config: RobotConfig = {
      v1: 2.5,
      v2: 3,
      v3: 2.5,
      v4: 2.5,
      v5: 2.5,
      v6: 2,
    };

    const args: ForwardKinematicsArgs = {
      theta1: 0,
      theta2: 0,
      theta3: -Math.PI / 2,
      theta4: Math.PI,
      theta5: -Math.PI / 2,
      theta6: 0,
      config,
    };

    const result = forward(args);

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
    const config: RobotConfig = {
      v1: 1,
      v2: 2,
      v3: 1.5,
      v4: 2,
      v5: 1.5,
      v6: 1,
    };

    const args: ForwardKinematicsArgs = {
      theta1: Math.PI / 2,
      theta2: -Math.PI / 4,
      theta3: Math.PI / 3,
      theta4: -Math.PI / 6,
      theta5: Math.PI / 8,
      theta6: -Math.PI / 9,
      config,
    };

    const result = forward(args);

    // Verify homogeneous row remains valid
    expect(result[3]).toEqual([0, 0, 0, 1]);
  });

  /**
   * Test Case 4:
   * Robot configuration:
   *
   *    ( ) -- [ ] -- ( ) -- [ ]
   *     |
   *    ( )
   *     |
   *    [ ]
   *
   * The robot's configuration includes a 90-degree rotation about the Y-axis
   * for the third joint, with no rotations applied to the other joints.
   */
  test("handles forward kinematics for a rotated third joint", () => {
    const config: RobotConfig = {
      v1: 2.5,
      v2: 3,
      v3: 2.5,
      v4: 2.5,
      v5: 2.5,
      v6: 2,
    };

    const args: ForwardKinematicsArgs = {
      theta1: 0,
      theta2: 0,
      theta3: -Math.PI / 2,
      theta4: 0,
      theta5: 0,
      theta6: 0,
      config,
    };

    const result = forward(args);

    const expected: Matrix = [
      [0, 0, 1, 9.5], // Rotation in Z-direction; translation along Z
      [0, 1, 0, 0], // No rotation in Y-direction
      [-1, 0, 0, 5.5], // Rotation in X-direction; translation along X
      [0, 0, 0, 1], // Homogeneous row
    ];

    expect(result).toEqual(expected);
  });
});
