import { Matrix, Vector } from "../../../definitions";
import { createVector } from "../createVector";

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
 * @param lum - The combined lower and upper triangular matrix.
 * @param b - The right-hand side vector.
 * @returns The solution vector.
 */
export function solveLinearSystem(lum: Matrix, b: Vector): Vector {
  const n = lum.length;
  const y = createVector(n, 0);

  for (let i = 0; i < n; i++) {
    let sum = b[i];
    for (let j = 0; j < i; j++) {
      sum -= lum[i][j] * y[j];
    }
    y[i] = sum;
  }

  const x = createVector(n, 0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) {
      sum -= lum[i][j] * x[j];
    }
    x[i] = sum / lum[i][i];
  }

  return x;
}
