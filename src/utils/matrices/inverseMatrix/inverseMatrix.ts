import { Matrix } from "../../../definitions";
import {
  createMatrix,
  createVector,
  decomposeMatrix,
  solveLinearSystem,
} from "../../index";

/**
 * Computes the inverse of a matrix.
 *
 * @param m - The input matrix to invert.
 * @returns The inverse of the matrix.
 */
export function inverseMatrix(m: Matrix): Matrix {
  const n = m.length;
  const result = createMatrix(n, n, 0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = m[i][j];
    }
  }

  const lum = createMatrix(n, n, 0);
  const perm = createVector(n, 0);
  decomposeMatrix(m, lum, perm);

  const b = createVector(n, 0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      b[j] = i === perm[j] ? 1 : 0;
    }

    const x = solveLinearSystem(lum, b);
    for (let j = 0; j < n; j++) {
      result[j][i] = x[j];
    }
  }

  return result;
}
