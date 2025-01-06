export type Matrix = number[][];
export type Vector = number[];
export type MatrixRow = number[];

/**
 * Denavit-Hartenberg (DH) parameters for a single joint.
 */
export interface DHParameters {
  //Joint angle (theta) in radians.
  theta: number;

  //Link twist (alpha) in radians, describing the angle between the Z-axes of the previous and current joint.
  alpha: number;

  //Link length (r), the distance between Z-axes along the X-axis.
  r: number;

  //Link offset (d), the distance along the Z-axis from the previous joint to the current joint.
  d: number;
}

/**
 * Input arguments for the inverse kinematics function.
 */
export interface InverseKinematicsProps {
  // Target position of the end effector in the X-axis.
  x: number;

  //Target position of the end effector in the Y-axis.
  y: number;

  // Target position of the end effector in the Z-axis.
  z: number;

  //Target rotation (radians) of the end effector around the X-axis.
  r1: number;

  // Target rotation (radians) of the end effector around the Y-axis.
  r2: number;

  // Target rotation (radians) of the end effector around the Z-axis.
  r3: number;

  //Robot configuration defining link lengths and other parameters.
  config: RobotConfig;
}

export interface InverseKinematics1to3Result {
  theta1: number;
  theta2: number;
  theta3: number;
}

export interface RobotConfig {
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
  v6: number;
  base?: number;
  x0?: number;
  flip?: boolean;
  y0?: number;
  adjustments?: {
    t1?: number;
  };
}

export interface ForwardKinematicsArgs {
  theta1: number; // Joint angle θ1 in radians
  theta2: number; // Joint angle θ2 in radians
  theta3: number; // Joint angle θ3 in radians
  theta4: number; // Joint angle θ4 in radians
  theta5: number; // Joint angle θ5 in radians
  theta6: number; // Joint angle θ6 in radians
  config: RobotConfig; // Configuration parameters for the robot
}

export interface RobotLinks {
  base: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  a5: number;
  a6: number;
}
