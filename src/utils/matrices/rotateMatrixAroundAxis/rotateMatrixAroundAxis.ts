import { Matrix } from "../../../definitions";
import { matrixDotProduct } from "../../matrixDotProduct";

/**
 * Rotates a matrix around the specified axis by a given angle.
 *
 * @param {Matrix} matrix - The matrix to rotate.
 * @param {number} angle - The angle to rotate by (in radians).
 * @param {"x" | "y" | "z"} axis - The axis to rotate around ("x", "y", or "z").
 * @returns {Matrix} - The rotated matrix.
 *
 * Example Usage:
 * const rotatedMatrix = rotateMatrixAroundAxis(matrix, Math.PI / 4, "x");
 *
 * Diagrams:
 *
 * X-Axis Rotation Representation:
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
 *
 * Y-Axis Rotation Representation:
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
 *
 * Z-Axis Rotation Representation:
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

export function rotateMatrixAroundAxis(
  matrix: Matrix,
  angle: number,
  axis: "x" | "y" | "z"
): Matrix {
  let rotationMatrix: Matrix;

  switch (axis) {
    case "x":
      rotationMatrix = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)],
      ];
      break;

    case "y":
      rotationMatrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)],
      ];
      break;

    case "z":
      rotationMatrix = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1],
      ];
      break;

    default:
      throw new Error(`Invalid axis: ${axis}. Must be "x", "y", or "z".`);
  }

  return matrixDotProduct(matrix, rotationMatrix);
}
