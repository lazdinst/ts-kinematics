export type Matrix = number[][];
export type MatrixRow = number[];

export interface DHParameters {
  theta: number; // Rotation around Z-axis (in radians)
  alpha: number; // Rotation around X-axis (in radians)
  r: number; // Distance along X-axis
  d: number; // Distance along Z-axis
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
