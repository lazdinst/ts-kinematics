import { composeDHTableMatrices } from "../composeDHTableMatrices";
import { degreesToRadians } from "../../utils";
import { Matrix, DHParameters, ForwardKinematicsArgs } from "../../definitions";

/**
 * Computes the forward kinematics for a 6-DOF robotic arm.
 *
 * @param {ForwardKinematicsArgs} args - The arguments object containing joint angles and robot configuration.
 * @returns {Matrix} - The 4x4 homogeneous transformation matrix.
 *
 * Example:
 * const result = forward({
 *   theta1: 0,
 *   theta2: 0,
 *   theta3: -Math.PI / 2,
 *   theta4: Math.PI,
 *   theta5: -Math.PI / 2,
 *   theta6: 0,
 *   config: {
 *     v1: 2.5,
 *     v2: 3,
 *     v3: 2.5,
 *     v4: 2.5,
 *     v5: 2.5,
 *     v6: 2,
 *   },
 * });
 * console.log(result);
 */
export const forward = ({
  theta1,
  theta2,
  theta3,
  theta4,
  theta5,
  theta6,
  config,
}: ForwardKinematicsArgs): Matrix => {
  /**
   * Calculate the link lengths for the robotic arm based on the provided configuration.
   * These values represent the distances along the X-axis (link lengths) and offsets along the Z-axis.
   *
   * - `x0`: Default offset along the X-axis, or 0 if not provided.
   * - `a1`: Link length for the first joint, includes optional base offset.
   * - `a2`: Link length for the second joint.
   * - `a3`: Link length for the third joint.
   * - `a4`: Link length for the fourth joint.
   * - `a5`: Link length for the fifth joint.
   * - `a6`: Link length for the sixth joint.
   *
   * These computed link lengths will be used as the `d` parameters in the Denavit-Hartenberg (DH) table.
   */
  const x0 = config.x0 ?? 0; // Default offset along the X-axis
  const a1 = config.v1 + (config.base ?? 0); // Link length for the first joint
  const a2 = config.v2; // Link length for the second joint
  const a3 = config.v3; // Link length for the third joint
  const a4 = config.v4; // Link length for the fourth joint
  const a5 = config.v5; // Link length for the fifth joint
  const a6 = config.v6; // Link length for the sixth joint

  // Define 90 degrees in radians
  const degrees90InRadians = degreesToRadians(90);

  // Build the Denavit-Hartenberg parameter table using the DHParameters type
  const dhTable: DHParameters[] = [
    { theta: theta1, alpha: degrees90InRadians, r: x0, d: a1 },
    { theta: theta2 + degrees90InRadians, alpha: 0, r: a2, d: 0 },
    {
      theta: theta3 - degrees90InRadians,
      alpha: -degrees90InRadians,
      r: 0,
      d: 0,
    },
    { theta: theta4, alpha: degrees90InRadians, r: 0, d: a3 + a4 },
    { theta: theta5, alpha: -degrees90InRadians, r: 0, d: 0 },
    { theta: theta6, alpha: 0, r: 0, d: a5 + a6 },
  ];

  // Compute the forward kinematics
  const { cumulativeTransformationMatrix } = composeDHTableMatrices(dhTable);

  return cumulativeTransformationMatrix;
};
