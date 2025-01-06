import { Matrix } from "../../../definitions";
import {
  createMatrix,
  createVector,
  decomposeMatrix,
  solveLinearSystem,
} from "../../index";

/**
 * Computes the inverse of a given square matrix using LU decomposition.
 *
 * This function leverages Crout's method for LU decomposition to factorize the input matrix
 * into lower and upper triangular matrices. The inverse is computed by solving a series of
 * linear systems using forward and backward substitution. The result is a matrix such that
 * when multiplied by the original matrix, produces the identity matrix.
 *
 * Special care is taken to handle singular matrices, where the determinant is zero, as
 * they cannot be inverted. In such cases, the function throws an appropriate error.
 *
 * **Note:** This implementation assumes the input matrix is square.
 *
 * @param matrix - The input matrix to invert. Must be a non-singular square matrix.
 * @returns A matrix representing the inverse of the input matrix.
 * @throws {Error} If the input matrix is singular and cannot be inverted.
 */

export function inverseMatrix(matrix: Matrix): Matrix {
  const size = matrix.length;

  const inverse = createMatrix(size, size, 0);

  // Copy the input matrix into the result to preserve immutability
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    for (let colIndex = 0; colIndex < size; colIndex++) {
      inverse[rowIndex][colIndex] = matrix[rowIndex][colIndex];
    }
  }

  const luDecomposedMatrix = createMatrix(size, size, 0);
  const rowPermutations = createVector(size, 0);
  const parity = decomposeMatrix(matrix, luDecomposedMatrix, rowPermutations);

  let determinant = parity;
  for (let i = 0; i < size; i++) {
    determinant *= luDecomposedMatrix[i][i];
  }

  if (determinant === 0) {
    throw new Error("Matrix is singular and cannot be inverted.");
  }

  const unitVector = createVector(size, 0);
  for (let colIndex = 0; colIndex < size; colIndex++) {
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      unitVector[rowIndex] = colIndex === rowPermutations[rowIndex] ? 1 : 0;
    }

    const solution = solveLinearSystem(luDecomposedMatrix, unitVector);
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      inverse[rowIndex][colIndex] = solution[rowIndex];
    }
  }

  return inverse;
}
