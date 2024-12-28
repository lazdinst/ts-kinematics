import { buildHomogeneousTable } from "../buildHomogeneousTable";
import { degreesToRadians } from "../../utils";
import { Matrix } from "../../definitions";

interface RobotConfig {
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
  v6: number;
  base?: number;
  x0?: number;
}

/**
 * Computes the forward kinematics for a 6-DOF robotic arm.
 *
 * @param {number} t1 - Joint angle θ1 in radians.
 * @param {number} t2 - Joint angle θ2 in radians.
 * @param {number} t3 - Joint angle θ3 in radians.
 * @param {number} t4 - Joint angle θ4 in radians.
 * @param {number} t5 - Joint angle θ5 in radians.
 * @param {number} t6 - Joint angle θ6 in radians.
 * @param {RobotConfig} config - Configuration parameters for the robot.
 * @returns {Matrix} - The 4x4 homogeneous transformation matrix.
 *
 * Example:
 * const result = forward(0, 0, -Math.PI / 2, Math.PI, -Math.PI / 2, 0, {
 *   v1: 2.5, v2: 3, v3: 2.5, v4: 2.5, v5: 2.5, v6: 2,
 * });
 * console.log(result);
 */
export const forward = (
  t1: number,
  t2: number,
  t3: number,
  t4: number,
  t5: number,
  t6: number,
  config: RobotConfig
): Matrix => {
  // Combine default and input configurations
  const robotConfig = {
    ...config,
    a1: config.v1 + (config.base ?? 0),
    a2: config.v2,
    a3: config.v3,
    a4: config.v4,
    a5: config.v5,
    a6: config.v6,
  };

  const { a1, a2, a3, a4, a5, a6, x0 = 0 } = robotConfig;

  // Define 90 degrees in radians
  const degrees90InRadians = degreesToRadians(90);

  // Build the Denavit-Hartenberg parameter table
  const dhTable: [number, number, number, number][] = [
    [t1, degrees90InRadians, x0, a1],
    [t2 + degrees90InRadians, 0, a2, 0],
    [t3 - degrees90InRadians, -degrees90InRadians, 0, 0],
    [t4, degrees90InRadians, 0, a3 + a4],
    [t5, -degrees90InRadians, 0, 0],
    [t6, 0, 0, a5 + a6],
  ];

  // Compute the forward kinematics
  const { cumulativeTransformationMatrix } = buildHomogeneousTable(dhTable);

  return cumulativeTransformationMatrix;
};
