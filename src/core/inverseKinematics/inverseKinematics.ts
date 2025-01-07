import {
  matrixDotProduct,
  subMatrix,
  inverseMatrix,
  eulerZXZRotation,
} from "../../utils";
import {
  Matrix,
  InverseKinematicsProps,
  DHParameters,
  RobotLinks,
} from "../../definitions";
import { degreesToRadians, roundToPrecision } from "../../utils";
import { composeDHTableMatrices } from "../../core";
import { inverseKinematics1to3 } from "./inverseKinematics1to3";

/**
 * Computes the inverse kinematics for a 6-DOF robotic arm.
 *
 * @param {InverseKinematicsProps} args - The arguments object containing target position, orientation, and robot configuration.
 * @returns {number[]} - Array of joint angles [theta1, theta2, theta3, theta4, theta5, theta6].
 */
export const inverseKinematics = ({
  x,
  y,
  z,
  r1,
  r2,
  r3,
  config,
}: InverseKinematicsProps): number[] => {
  const { v1, v2, v3, v4, v5, v6, base = 0, flip = true } = config;

  const robotLinks: RobotLinks = {
    base: base,
    a1: v1 + base,
    a2: v2,
    a3: v3,
    a4: v4,
    a5: v5,
    a6: v6,
  };

  // Step 1.1: Compute rotation matrix (R0_6) from end effector orientation
  const r0_6 = eulerZXZRotation(r1, r2, r3);

  // Step 1.2: Compute wrist displacement vector in the end effector's local frame
  const wristDisplacement = calculateWristDisplacementVector(v5 + v6);

  // Step 1.3: Transform wrist displacement vector to the global frame
  const wristDisplacementGlobal = transformWristDisplacement(
    r0_6,
    wristDisplacement
  );

  // Step 1.4: Calculate wrist center coordinates in the global frame
  const { x0_3, y0_3, z0_3 } = calculateWristCenter(
    x,
    y,
    z,
    wristDisplacementGlobal
  );

  // Step 2.1: Compute inverse kinematics for joints 1-3
  const { theta1, theta2, theta3 } = inverseKinematics1to3(
    x0_3,
    y0_3,
    z0_3,
    config
  );

  // Step 2.2: Compute the rotation matrix R0_3
  const { a1, a2 } = robotLinks;
  const d90 = degreesToRadians(90);

  const dhParameters: DHParameters[] = [
    { theta: theta1, alpha: d90, r: 0, d: a1 },
    { theta: theta2 + d90, alpha: 0, r: a2, d: 0 },
    {
      theta: theta3 - d90,
      alpha: -d90,
      r: 0,
      d: 0,
    },
  ];

  const { cumulativeTransformationMatrix } =
    composeDHTableMatrices(dhParameters);

  const r0_3 = subMatrix(cumulativeTransformationMatrix, 3, 3);
  const inv_r0_3 = inverseMatrix(r0_3);
  const r3_6 = matrixDotProduct(inv_r0_3, r0_6);

  const c = r3_6[0][2];
  const f = r3_6[1][2];
  const i = r3_6[2][2];
  const g = r3_6[2][0];
  const h = r3_6[2][1];

  const z_projection_x = r3_6[0][2];
  const z_projection_y = r3_6[1][2];
  const z_projection_z = r3_6[2][2];
  const x_projection_z = r3_6[2][0];
  const y_projection_z = r3_6[2][1];

  let theta4 = calculateTheta4(z_projection_y, z_projection_x);
  let theta5 = calculateTheta5(z_projection_x, z_projection_y, z_projection_z);
  let theta6 = calculateTheta6(y_projection_z, x_projection_z);

  const adjustedAngles = applyFlipAdjustments(flip, theta4, theta5, theta6);
  theta4 = adjustedAngles.theta4;
  theta5 = adjustedAngles.theta5;
  theta6 = adjustedAngles.theta6;

  return [theta1, theta2, theta3, theta4, theta5, theta6].map((theta) =>
    roundToPrecision(theta)
  );
};

/**
 * Calculates the wrist displacement vector in the end effector's local frame.
 * This vector represents the offset of the wrist center from the end effector
 * along the Z-axis of the end effector's coordinate frame.
 *
 * Explanation:
 * - The wrist center is the point where the last three joints (spherical wrist) rotate.
 * - The offset lies along the Z-axis in the local coordinate frame of the end effector.
 * - The X and Y components are zero because the displacement is purely along the Z-axis.
 * - This vector is later transformed into the robot's global frame using the rotation matrix R0_6.
 *
 * @param wristOffset - The combined offset distance (v5 + v6) from the end effector to the wrist center.
 * @returns A 3x1 matrix representing the displacement vector in the end effector's local frame.
 *
 * Example:
 * Input: wristOffset = 4.5
 * Output: [[0], [0], [4.5]]
 */
const calculateWristDisplacementVector = (wristOffset: number): Matrix => {
  return [[0], [0], [wristOffset]];
};

/**
 * Transforms the wrist displacement vector from the local frame
 * of the end effector to the global frame using the rotation matrix R0_6.
 *
 * @param r0_6 - A 3x3 rotation matrix representing the orientation of the end effector.
 * @param displacementVector - A 3x1 matrix representing the wrist displacement vector in the local frame.
 * @returns A 3x1 matrix representing the wrist displacement vector in the global frame.
 *
 * Example:
 * Input:
 * r0_6 = [[1, 0, 0], [0, 0, -1], [0, 1, 0]]
 * displacementVector = [[0], [0], [4.5]]
 * Output:
 * rotatedVector = [[0], [-4.5], [0]]
 */
const transformWristDisplacement = (
  r0_6: Matrix,
  displacementVector: Matrix
): Matrix => {
  return matrixDotProduct(r0_6, displacementVector);
};

/**
 * Calculates the global coordinates of the wrist center.
 *
 * The wrist center is the origin of the coordinate frame for joints 4, 5, and 6.
 * This function determines its position by subtracting the wrist displacement vector
 * (rotated into the global frame) from the end effector's global position.
 *
 * @param x - Global X-coordinate of the end effector.
 * @param y - Global Y-coordinate of the end effector.
 * @param z - Global Z-coordinate of the end effector.
 * @param wristDisplacementGlobal - Wrist displacement vector rotated into the global frame
 *                                   (a 3x1 matrix where each row represents a coordinate offset).
 * @returns An object containing the X, Y, and Z coordinates of the wrist center.
 */
const calculateWristCenter = (
  x: number,
  y: number,
  z: number,
  wristDisplacementGlobal: Matrix
): { x0_3: number; y0_3: number; z0_3: number } => {
  const x0_3 = x - wristDisplacementGlobal[0][0];
  const y0_3 = y - wristDisplacementGlobal[1][0];
  const z0_3 = z - wristDisplacementGlobal[2][0];

  return { x0_3, y0_3, z0_3 };
};

/**
 * Calculates theta4 based on the projection of the Z-axis of frame 3 onto the X-Y plane.
 *
 * @param {number} z_projection_y - The Y component of the Z-axis projection in frame 3 (r3_6[1][2]).
 * @param {number} z_projection_x - The X component of the Z-axis projection in frame 3 (r3_6[0][2]).
 * @returns {number} theta4 - The computed joint angle for theta4.
 */
function calculateTheta4(z_projection_y: number, z_projection_x: number) {
  return roundToPrecision(Math.atan2(z_projection_y, z_projection_x));
}

/**
 * Calculates theta5 based on the tilt of the Z-axis in frame 3 relative to the global frame.
 *
 * @param {number} z_projection_x - The X component of the Z-axis projection in frame 3 (r3_6[0][2]).
 * @param {number} z_projection_y - The Y component of the Z-axis projection in frame 3 (r3_6[1][2]).
 * @param {number} z_projection_z - The Z component of the Z-axis projection in frame 3 (r3_6[2][2]).
 * @returns {number} theta5 - The computed joint angle for theta5.
 */
function calculateTheta5(
  z_projection_x: number,
  z_projection_y: number,
  z_projection_z: number
) {
  const magnitude = Math.sqrt(
    Math.pow(z_projection_x, 2) + Math.pow(z_projection_y, 2)
  );
  return roundToPrecision(-Math.atan2(magnitude, z_projection_z));
}

/**
 * Calculates theta6 based on the projection of the X and Y axes of frame 3 onto the Z plane.
 *
 * @param {number} y_projection_z - The Y component of the X-axis projection in frame 3 (r3_6[2][1]).
 * @param {number} x_projection_z - The X component of the X-axis projection in frame 3 (r3_6[2][0]).
 * @returns {number} theta6 - The computed joint angle for theta6.
 */
function calculateTheta6(y_projection_z: number, x_projection_z: number) {
  return roundToPrecision(Math.atan2(-y_projection_z, x_projection_z));
}

/**
 * Adjusts theta4, theta5, and theta6 based on the flip configuration.
 * Ensures the robot can handle multiple valid configurations for the same end-effector pose.
 *
 * @param {boolean} flip - Whether to apply flip adjustments.
 * @param {number} theta4 - Initial theta4 angle in radians.
 * @param {number} theta5 - Initial theta5 angle in radians.
 * @param {number} theta6 - Initial theta6 angle in radians.
 * @returns {Object} - Adjusted angles { theta4, theta5, theta6 }.
 */
function applyFlipAdjustments(
  flip: boolean,
  theta4: number,
  theta5: number,
  theta6: number
) {
  if (!flip) return { theta4, theta5, theta6 };

  const diffTheta4 = Math.PI - Math.abs(theta4);
  const diffTheta6 = Math.PI - Math.abs(theta6);

  // Flip reciprocal of theta4 and theta6, and invert theta5
  if (Math.abs(theta4) > Math.PI / 2) {
    theta4 = theta4 < 0 ? diffTheta4 : -diffTheta4;
    theta5 = -theta5;

    // Flip theta6 if theta4's difference is less than 90 degrees
    if (diffTheta4 < Math.PI / 2 && Math.abs(diffTheta4) > Number.EPSILON) {
      theta6 = theta6 < 0 ? diffTheta6 : -diffTheta6;
    }

    // Special case: Reset theta6 if it equals ±π
    if (
      Math.abs(theta6 - Math.PI) < Number.EPSILON ||
      Math.abs(theta6 + Math.PI) < Number.EPSILON
    ) {
      theta6 = 0;
    }
  }

  return { theta4, theta5, theta6 };
}
