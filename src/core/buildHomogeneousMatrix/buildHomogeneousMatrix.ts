import { Matrix, MatrixRow, DHParameters } from "../../definitions";
import { mapMatrix, normalizeAndRoundValue } from "../../utils";

/**
 * Formula for the Homogeneous Transformation Matrix \( H_2 \):
 *
 * H =
 * [
 *   [ cos(θ), -sin(θ)cos(α),  sin(θ)sin(α), rcos(θ) ],
 *   [ sin(θ),  cos(θ)cos(α), -cos(θ)sin(α), rsin(θ) ],
 *   [      0,        sin(α),        cos(α),       d ],
 *   [      0,             0,             0,       1 ],
 * ]
 *
 * Where:
 * - θ : Rotation around the Z-axis
 * - α : Rotation around the X-axis
 * - r : Distance along the X-axis
 * - d : Distance along the Z-axis
 *
 * Explanation:
 * - The first row defines rotation and translation in the X-direction.
 * - The second row defines rotation and translation in the Y-direction.
 * - The third row defines translation in the Z-direction with no rotation.
 * - The fourth row is the homogeneous coordinate row.
 */

/**
 * Computes the X-axis rotation row for a homogeneous transformation matrix.
 *
 * @param {number} theta - Rotation angle around the Z-axis (in radians).
 * @param {number} alpha - Rotation angle around the X-axis (in radians).
 * @param {number} r - Translation along the X-axis.
 * @returns {MatrixRow} - The first row of the transformation matrix.
 */
// This looks correct, i have verified from HTM by Denavit Hartenberg.
// https://youtu.be/4WRhVqQaZTE?si=wDyl9BUZlrPJhpus&t=1663
export const computeRotationRowX = (
  theta: number,
  alpha: number,
  r: number
): MatrixRow => [
  Math.cos(theta),
  -Math.sin(theta) * Math.cos(alpha),
  Math.sin(theta) * Math.sin(alpha),
  r * Math.cos(theta), // Translation along X
];

/**
 * Computes the Y-axis rotation row for a homogeneous transformation matrix.
 *
 * @param {number} theta - Rotation angle around the Z-axis (in radians).
 * @param {number} alpha - Rotation angle around the X-axis (in radians).
 * @param {number} r - Translation along the X-axis.
 * @returns {MatrixRow} - The second row of the transformation matrix.
 */
// This looks correct, i have verified from HTM by Denavit Hartenberg.
// https://youtu.be/4WRhVqQaZTE?si=wDyl9BUZlrPJhpus&t=1663
export const computeRotationRowY = (
  theta: number,
  alpha: number,
  r: number
): MatrixRow => [
  Math.sin(theta),
  Math.cos(theta) * Math.cos(alpha),
  -Math.cos(theta) * Math.sin(alpha),
  r * Math.sin(theta), // Translation along Y
];

/**
 * Computes the Z-axis rotation row for a homogeneous transformation matrix.
 *
 * @param {number} alpha - Rotation angle around the X-axis (in radians).
 * @param {number} d - Translation along the Z-axis.
 * @returns {MatrixRow} - The third row of the transformation matrix.
 */
export const computeRotationRowZ = (alpha: number, d: number): MatrixRow => [
  0,
  Math.sin(alpha),
  Math.cos(alpha),
  d, // Translation along Z
];

/**
 * Builds the homogeneous transformation matrix for a single set of Denavit-Hartenberg parameters.
 *
 * @param {DHParameters} params - The structured DH parameters:
 *   - `theta`: Rotation around Z-axis (in radians).
 *   - `alpha`: Rotation around X-axis (in radians).
 *   - `r`: Distance along X-axis.
 *   - `d`: Distance along Z-axis.
 * @param {number} [precision=6] - The number of decimal places to round to (default is 6).
 * @returns {Matrix} - The 4x4 homogeneous transformation matrix for the given parameters.
 */
export const buildHomogeneousMatrix = (
  { theta, alpha, r, d }: DHParameters,
  precision: number = 6
): Matrix => {
  const rotationRowX = computeRotationRowX(theta, alpha, r);
  const rotationRowY = computeRotationRowY(theta, alpha, r);
  const rotationRowZ = computeRotationRowZ(alpha, d); // Translation along Z
  const homogeneousRow = [0, 0, 0, 1]; // Homogeneous coordinate row

  // Combine the rows into the full matrix
  const matrix = [rotationRowX, rotationRowY, rotationRowZ, homogeneousRow];

  // Normalize and round the matrix
  return mapMatrix(matrix, (value) => normalizeAndRoundValue(value, precision));
};
