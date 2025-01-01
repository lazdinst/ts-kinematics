import { Matrix } from "../../../definitions";
import { roundToPrecision } from "../../math/roundToPrecision/roundToPrecision";

/**
 * Computes the dot product of two matrices.
 *
 * This function performs matrix multiplication (dot product) on two matrices.
 * The number of columns in the first matrix must equal the number of rows in the second matrix.
 *
 * @param {Matrix} matrix1 - The first matrix (A).
 * @param {Matrix} matrix2 - The second matrix (B).
 * @returns {Matrix} - The resulting matrix from the dot product.
 *
 * Example:
 * const matrix1 = [
 *   [1, 2],
 *   [3, 4]
 * ];
 * const matrix2 = [
 *   [5, 6],
 *   [7, 8]
 * ];
 * const result = matrixDotProduct(matrix1, matrix2);
 * console.log(result); // [[19, 22], [43, 50]]
 */
export function matrixDotProduct(matrix1: Matrix, matrix2: Matrix): Matrix {
  // Validate that matrices are not empty
  if (matrix1.length === 0 || matrix2.length === 0) {
    return [];
  }

  // Validate that the matrices can be multiplied
  if (matrix1[0].length !== matrix2.length) {
    throw new Error(
      "The number of columns in matrix1 must equal the number of rows in matrix2."
    );
  }

  // Initialize the result matrix with zeros
  const result: Matrix = new Array(matrix1.length)
    .fill(0)
    .map(() => new Array(matrix2[0].length).fill(0));

  // Compute the dot product
  return result.map((row, i) =>
    row.map((_, j) =>
      roundToPrecision(
        matrix1[i].reduce((sum, value, k) => sum + value * matrix2[k][j], 0)
      )
    )
  );
}
