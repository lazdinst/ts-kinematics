import { degreesToRadians, roundToPrecision } from "../../utils";
import { RobotConfig, InverseKinematics1to3Result } from "../../definitions";

/**
 * Computes the base joint angle θ1 for alignment with the XY-plane.
 *
 * @param x0_3 - Target X coordinate of the wrist center.
 * @param y0_3 - Target Y coordinate of the wrist center.
 * @returns The base joint angle θ1 in radians.
 */
const calculateBaseJointAngle = (x0_3: number, y0_3: number): number => {
  return Math.atan2(y0_3, x0_3);
};

/**
 * Computes the planar distance (r1) between the origin and the target position
 * in the XY-plane.
 *
 * @param x0_3 - Target X coordinate of the wrist center.
 * @param y0_3 - Target Y coordinate of the wrist center.
 * @returns The planar distance r1.
 */
const calculatePlanarDistance = (x0_3: number, y0_3: number): number => {
  return Math.sqrt(Math.pow(x0_3, 2) + Math.pow(y0_3, 2));
};

/**
 * Computes the vertical offset (r2) between the target Z position and the robot's base.
 *
 * @param z0_3 - Target Z coordinate of the wrist center.
 * @param a1 - Length of the first link in the Z direction.
 * @returns The vertical offset r2.
 */
const calculateVerticalOffset = (z0_3: number, a1: number): number => {
  return z0_3 - a1;
};

/**
 * Computes the angle θ2 offset for the wrist center position.
 *
 * @param r2 - Vertical offset in the Z direction.
 * @param r1 - Planar distance in the XY-plane.
 * @returns The angle θ2 offset in radians.
 */
const calculateTheta2Offset = (r2: number, r1: number): number => {
  return Math.atan2(r2, r1);
};

/**
 * Computes the hypotenuse (r3) from planar and vertical offsets.
 *
 * @param r1 - Planar distance in the XY-plane.
 * @param r2 - Vertical offset in the Z direction.
 * @returns The hypotenuse r3.
 */
const calculateDiagonalLength = (r1: number, r2: number): number => {
  return Math.sqrt(Math.pow(r1, 2) + Math.pow(r2, 2));
};

/**
 * Computes the angle θ1 offset using the law of cosines.
 *
 * @param a2 - Length of the second link.
 * @param a3 - Combined length of the third and fourth links.
 * @param r3 - Diagonal distance from the base to the wrist center.
 * @returns The angle θ1 offset in radians.
 */
const calculateTheta1Offset = (a2: number, a3: number, r3: number): number => {
  return Math.acos(
    (Math.pow(a3, 2) - Math.pow(a2, 2) - Math.pow(r3, 2)) / (-2 * a2 * r3)
  );
};

/**
 * Computes the joint angle θ2 by subtracting intermediate angles.
 *
 * @param angle1 - Intermediate angle θ1 offset.
 * @param angle2 - Intermediate angle θ2 offset.
 * @returns The joint angle θ2 in radians.
 */
const calculateTheta2 = (angle1: number, angle2: number): number => {
  return (angle2 - angle1) * -1; // Negate to match main x, y frame
};

/**
 * Computes the angle θ3 offset using the law of cosines.
 *
 * @param a2 - Length of the second link.
 * @param a3 - Combined length of the third and fourth links.
 * @param r3 - Diagonal distance from the base to the wrist center.
 * @returns The angle θ3 offset in radians.
 */
const calculateTheta3Offset = (a2: number, a3: number, r3: number): number => {
  return Math.acos(
    (Math.pow(r3, 2) - Math.pow(a2, 2) - Math.pow(a3, 2)) / (-2 * a2 * a3)
  );
};

/**
 * Computes the joint angle θ3 by subtracting from π.
 *
 * @param angle - Intermediate angle θ3 offset.
 * @returns The joint angle θ3 in radians.
 */
const calculateTheta3 = (angle: number): number => {
  return (Math.PI - angle) * -1; // Negate to match main x, y frame
};

/**
 * Computes the inverse kinematics for the first three joints of a 6-DOF robotic arm.
 *
 * The function calculates the angles required for joints 1, 2, and 3 to position
 * the robot's wrist center at the specified (x, y, z) coordinates. This involves:
 * 1. Calculating the planar distance (r1) in the XY plane.
 * 2. Determining the vertical offset (r2) in the Z direction.
 * 3. Using the Pythagorean theorem to find the hypotenuse (r3) formed by r1 and r2.
 * 4. Applying the law of cosines to derive intermediate angles (p1, p2, p3).
 * 5. Calculating the joint angles (t1, t2, t3) based on these intermediate calculations.
 *
 * The angles are calculated to align the robot's wrist center with the target position,
 * considering the robot's link lengths and optional offsets in the X and Y directions.
 *
 * @param x - Target X coordinate of the wrist center.
 * @param y - Target Y coordinate of the wrist center.
 * @param z - Target Z coordinate of the wrist center.
 * @param robotConfig - Configuration object containing link lengths and offsets.
 * @returns Object containing joint angles { theta1, theta2, theta3 }, rounded to precision.
 */
export const inverseKinematics1to3 = (
  x: number,
  y: number,
  z: number,
  robotConfig: RobotConfig
): InverseKinematics1to3Result => {
  const { v1, v2, v3, v4, base = 0, x0 = 0, y0 = 0, adjustments } = robotConfig;

  const a1 = v1 + base;
  const a2 = v2;
  const a3 = v3 + v4; // Wrist center includes joint 4 offset

  const r1 = calculatePlanarDistance(x, y) - x0;
  const r2 = calculateVerticalOffset(z, a1);

  const p2 = calculateTheta2Offset(r1, r2);
  const r3 = calculateDiagonalLength(r1, r2);
  const p1 = calculateTheta1Offset(a2, a3, r3);
  const p3 = calculateTheta3Offset(a2, a3, r3);

  const theta1 = calculateBaseJointAngle(x, y - y0);
  const theta3 = calculateTheta3(p3);

  let theta2 = calculateTheta2(p1, p2);

  // Optional adjustments for angles
  // This is a hack for specific robot configurations, e.g. for the UR5
  // This needs to be added to test cases
  if (adjustments && adjustments.t1) {
    const theta1Adjustment = degreesToRadians(adjustments.t1);
    theta2 += theta2 < 0 ? -theta1Adjustment : theta1Adjustment;
  }

  return {
    theta1: roundToPrecision(theta1),
    theta2: roundToPrecision(theta2),
    theta3: roundToPrecision(theta3),
  };
};
