import { Matrix } from "../../definitions";
import { mapMatrix, normalizeAndRoundValue } from "../../utils";

/**
 * Builds the homogeneous transformation matrix for a single set of Denavit-Hartenberg parameters.
 *
 * @param {[number, number, number, number]} dhParams - The DH parameters:
 *   [θ (rotation around Z), α (rotation around X), r (distance along X), d (distance along Z)].
 * @param {number} [precision=6] - The number of decimal places to round to (default is 6).
 * @returns {Matrix} - The 4x4 homogeneous transformation matrix for the given parameters.
 *
 * Matrix Structure:
 * [
 *   [r11, r12, r13, tx], // First row: Rotation (X-axis), Translation (X)
 *   [r21, r22, r23, ty], // Second row: Rotation (Y-axis), Translation (Y)
 *   [r31, r32, r33, tz], // Third row: Rotation (Z-axis), Translation (Z)
 *   [  0,   0,   0,  1]  // Fourth row: Homogeneous coordinate
 * ]
 *
 * Explanation:
 * - **Rotation**:
 *   The upper-left 3x3 submatrix defines the orientation (rotations around the X, Y, Z axes).
 * - **Translation**:
 *   The last column (tx, ty, tz) defines the position (translation along the X, Y, Z axes).
 * - **Homogeneous Row**:
 *   The fourth row [0, 0, 0, 1] is a convention used in homogeneous coordinates for 3D transformations.
 *
 * Example:
 * const dhParams = [Math.PI / 4, Math.PI / 6, 10, 5];
 * const matrix = buildHomogeneousMatrix(dhParams);
 * console.log(matrix);
 */

export const buildHomogeneousMatrix = (
  dhParams: [number, number, number, number],
  precision: number = 6
): Matrix => {
  const [theta, alpha, r, d] = dhParams;

  // Define the rows of the matrix
  const rotationRowX = [
    Math.cos(theta),
    -Math.sin(theta) * Math.cos(alpha),
    Math.sin(theta) * Math.sin(alpha),
    r * Math.cos(theta), // Translation along X
  ];

  const rotationRowY = [
    Math.sin(theta),
    Math.cos(theta) * Math.cos(alpha),
    -Math.cos(theta) * Math.sin(alpha),
    r * Math.sin(theta), // Translation along Y
  ];

  const rotationRowZ = [0, Math.sin(alpha), Math.cos(alpha), d]; // Translation along Z

  const homogeneousRow = [0, 0, 0, 1]; // Homogeneous coordinate row

  // Combine the rows into the full matrix
  const matrix = [rotationRowX, rotationRowY, rotationRowZ, homogeneousRow];

  // Normalize and round the matrix
  return mapMatrix(matrix, (value) => normalizeAndRoundValue(value, precision));
};
