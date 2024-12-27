import { matrixDotProduct } from "./matrixDotProduct";

/**
 * Rotates a matrix around the X-axis by a specified angle.
 *
 * This function applies a 3D rotation transformation around the X-axis.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @param {number} angle - The angle to rotate by (in radians).
 * @returns {number[][]} - The rotated matrix.
 *
 * Matrix Representation:
 *       Z0
 *        ^
 *        |
 *    Z1  |   Y1
 *     \  |  /
 *      \ | /
 *        + -----------> Y0
 *       /
 *      /
 *     /
 *  X0-X1
 */
export function rotateAroundXAxis(
  matrix: number[][],
  angle: number
): number[][] {
  const rotationMatrix = [
    [1, 0, 0], // x0
    [0, Math.cos(angle), -Math.sin(angle)], // y0
    [0, Math.sin(angle), Math.cos(angle)], // z0
  ];

  return matrixDotProduct(matrix, rotationMatrix);
}

/**
 * Rotates a matrix around the Y-axis by a specified angle.
 *
 * This function applies a 3D rotation transformation around the Y-axis.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @param {number} angle - The angle to rotate by (in radians).
 * @returns {number[][]} - The rotated matrix.
 *
 * Matrix Representation:
 *       Z0
 *        ^
 *        |
 *    X1  |   Z1
 *     \  |  /
 *      \ | /
 *        + -----------> Y0-Y1
 *       /
 *      /
 *     /
 *   X0
 */
export function rotateAroundYAxis(
  matrix: number[][],
  angle: number
): number[][] {
  const rotationMatrix = [
    [Math.cos(angle), 0, Math.sin(angle)], // x0
    [0, 1, 0], // y0
    [-Math.sin(angle), 0, Math.cos(angle)], // z0
  ];

  return matrixDotProduct(matrix, rotationMatrix);
}

/**
 * Rotates a matrix around the Z-axis by a specified angle.
 *
 * This function applies a 3D rotation transformation around the Z-axis.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @param {number} angle - The angle to rotate by (in radians).
 * @returns {number[][]} - The rotated matrix.
 *
 * Matrix Representation:
 *      Z0-Z1
 *        ^
 *        |
 *        |   Y1
 *        |  /
 *        | /
 *        + -----------> Y0
 *       / \
 *      /   \
 *     /     X1
 *   X0
 */
export function rotateAroundZAxis(
  matrix: number[][],
  angle: number
): number[][] {
  const rotationMatrix = [
    [Math.cos(angle), -Math.sin(angle), 0], // x0
    [Math.sin(angle), Math.cos(angle), 0], // y0
    [0, 0, 1], // z0
  ];

  return matrixDotProduct(matrix, rotationMatrix);
}
