export type Matrix = number[][];
export type MatrixRow = number[];

export interface DHParameters {
  theta: number; // Rotation around Z-axis (in radians)
  alpha: number; // Rotation around X-axis (in radians)
  r: number; // Distance along X-axis
  d: number; // Distance along Z-axis
}
