import { Matrix, Vector } from "../../../definitions";
import { createVector } from "../createVector";
import { roundToPrecision } from "../../math";
/**
 * Solves a linear system using forward and backward substitution.
 * https://en.wikipedia.org/wiki/Crout_matrix_decomposition
 * This function takes a matrix in LU decomposed form (`lum`) and a right-hand side vector (`b`).
 * It first performs forward substitution to solve for an intermediate vector `y`, and then
 * uses backward substitution to solve for the final solution vector `x`.
 *
 * ### Forward Substitution:
 * Solves the lower triangular system `Ly = b` where `L` is the lower triangular part of `lum`.
 *
 * ### Backward Substitution:
 * Solves the upper triangular system `Ux = y` where `U` is the upper triangular part of `lum`.
 *
 * @param luMatrix - The combined lower and upper triangular matrix.
 * @param b - The right-hand side vector.
 * @returns The solution vector.
 */

export function solveLinearSystem(
  luMatrix: Matrix,
  unitVector: Vector
): Vector {
  let size = luMatrix.length;
  let solutionVector = createVector(size, 0.0);
  for (let i = 0; i < size; ++i) {
    solutionVector[i] = unitVector[i];
  }

  for (let i = 1; i < size; ++i) {
    let sum = solutionVector[i];
    for (let j = 0; j < i; ++j) {
      sum -= luMatrix[i][j] * solutionVector[j];
    }
    solutionVector[i] = roundToPrecision(sum);
  }

  const lastDiagonal = luMatrix[size - 1][size - 1];
  solutionVector[size - 1] = roundToPrecision(
    solutionVector[size - 1] / lastDiagonal
  ); // Normalize and round
  for (let i = size - 2; i >= 0; --i) {
    let sum = solutionVector[i];
    for (let j = i + 1; j < size; ++j) {
      sum -= luMatrix[i][j] * solutionVector[j];
    }
    const diagonalValue = luMatrix[i][i]; // More descriptive variable name
    solutionVector[i] = roundToPrecision(sum / diagonalValue); // Normalize and round
  }

  return solutionVector;
}
