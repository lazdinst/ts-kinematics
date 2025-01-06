import { degreesToRadians, inverseMatrix } from "../../utils";
import { round, roundOne } from "./round";
import { matrixSubset } from "./matrixSubset";
import { matrixDot } from "./matrixDot";
import { buildHomogeneousDenavitForTable } from "./denavitHartenberg";
import { inverse1_3 } from "./inverse1_3";
import { zxz } from "./euler";
import { cleanAndRoundMatrix } from "./roundMatrix";

const logger = Debug("ik:inverse" + "\t");

// Define input and output types
export interface InverseKinematicsArgs {
  x: number; // Target x-coordinate
  y: number; // Target y-coordinate
  z: number; // Target z-coordinate
  r1: number; // Rotation angle around X-axis
  r2: number; // Rotation angle around Y-axis
  r3: number; // Rotation angle around Z-axis
  config: RobotConfig; // Robot configuration parameters
}

export interface RobotConfig {
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  a5: number;
  a6: number;
  x0?: number;
  y0?: number;
  flip?: boolean;
}

export const inverse = ({
  x,
  y,
  z,
  r1,
  r2,
  r3,
  config,
}: InverseKinematicsArgs): number[] => {
  const { a1, a2, a3, a4, a5, a6, x0 = 0, y0 = 0, flip } = config;

  // Step 1: Compute the rotation matrix R0_6
  const r0_6 = cleanAndRoundMatrix(zxz(r1, r2, r3));
  logger("R0_6:", r0_6);

  // Step 2: Calculate wrist center (x0_3, y0_3, z0_3)
  const wristOffset = matrixDot(r0_6, [[0], [0], [a5 + a6]]);
  const x0_3 = x - wristOffset[0][0];
  const y0_3 = y - wristOffset[1][0];
  const z0_3 = z - wristOffset[2][0];
  logger("Wrist center (x0_3, y0_3, z0_3):", x0_3, y0_3, z0_3);

  // Step 3: Solve inverse kinematics for joints 1-3
  const jointConfig = { a1, a2, a3: a3 + a4, x0, y0 };
  const [theta1, theta2, theta3] = inverse1_3(x0_3, y0_3, z0_3, jointConfig);

  logger("Joints 1-3 angles:", theta1, theta2, theta3);

  // Step 4: Compute the transformation matrix for joints 1-3 (H0_3)
  const degrees90InRadians = degreesToRadians(90);
  const pt_0_3 = [
    [theta1, degrees90InRadians, 0, a1],
    [theta2 + degrees90InRadians, 0, a2, 0],
    [theta3 - degrees90InRadians, -degrees90InRadians, 0, 0],
  ];
  const { endMatrix: h0_3 } = buildHomogeneousDenavitForTable(pt_0_3);
  const r0_3 = matrixSubset(h0_3, 3, 3);
  const invR0_3 = inverseMatrix(r0_3);

  // Step 5: Calculate R3_6 and solve for joints 4-6
  const r3_6 = matrixDot(invR0_3, r0_6);

  const [theta4, theta5, theta6] = solveAnglesFromR3_6(r3_6, flip);

  // Return all joint angles
  return [theta1, theta2, theta3, theta4, theta5, theta6].map((a) =>
    Object.is(a, -0) ? 0 : a
  );
};

// Helper function to solve angles from R3_6
const solveAnglesFromR3_6 = (r3_6: number[][], flip?: boolean): number[] => {
  const c = r3_6[0][2];
  const f = r3_6[1][2];
  const i = r3_6[2][2];
  const g = r3_6[2][0];
  const h = r3_6[2][1];

  const theta5 = -Math.atan2(Math.sqrt(c ** 2 + f ** 2), i);
  let theta4 = Math.atan2(f, c);
  let theta6 = Math.atan2(-h, g);

  if (flip) {
    const diff4 = Math.PI - Math.abs(theta4);
    const diff6 = Math.PI - Math.abs(theta6);

    if (Math.abs(theta4) > Math.PI / 2) {
      theta4 = theta4 < 0 ? diff4 : -diff4;
      theta5 = -theta5;
      if (diff4 < Math.PI / 2) {
        theta6 = theta6 < 0 ? diff6 : -diff6;
      }
      if (Math.abs(theta6) === Math.PI) {
        theta6 = 0;
      }
    }
  }

  return [theta4, theta5, theta6];
};
