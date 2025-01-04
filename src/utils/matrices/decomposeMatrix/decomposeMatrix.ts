import { Matrix, Vector } from "../../../definitions";
import { createVector } from "../createVector";

/**
 * Decomposes a matrix into lower and upper triangular matrices (LU decomposition).
 *
 * @param m - The input matrix to decompose.
 * @param lum - The resulting combined lower and upper triangular matrix.
 * @param perm - The resulting permutation vector.
 */
export function decomposeMatrix(m: Matrix, lum: Matrix, perm: Vector): void {
  const n = m.length;
  const scales = createVector(n, 0);

  for (let i = 0; i < n; i++) {
    scales[i] = Math.max(...m[i].map(Math.abs));
    perm[i] = i;
  }

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < j; i++) {
      let sum = m[i][j];
      for (let k = 0; k < i; k++) {
        sum -= lum[i][k] * lum[k][j];
      }
      lum[i][j] = sum;
    }

    let pivot = 0;
    let pivotRow = -1;
    for (let i = j; i < n; i++) {
      let sum = m[i][j];
      for (let k = 0; k < j; k++) {
        sum -= lum[i][k] * lum[k][j];
      }
      lum[i][j] = sum;

      const value = Math.abs(sum / scales[i]);
      if (value > pivot) {
        pivot = value;
        pivotRow = i;
      }
    }

    if (pivotRow !== j) {
      [lum[j], lum[pivotRow]] = [lum[pivotRow], lum[j]];
      [perm[j], perm[pivotRow]] = [perm[pivotRow], perm[j]];
      [scales[j], scales[pivotRow]] = [scales[pivotRow], scales[j]];
    }

    const diag = lum[j][j];
    if (diag !== 0) {
      for (let i = j + 1; i < n; i++) {
        lum[i][j] /= diag;
      }
    }
  }
}
