import { Matrix, Vector } from "../../../definitions";
import { roundToPrecision } from "../../math";
/**
 * Decomposes a square matrix into its LU (Lower and Upper triangular) form using Crout's method.
 * This function is a key component in solving linear systems, computing matrix determinants,
 * and calculating matrix inverses.
 *
 * **How it works:**
 * - The input matrix `matrix` is decomposed such that:
 *   - The lower triangular matrix (L) has 1s on its diagonal and other non-zero elements below it.
 *   - The upper triangular matrix (U) has non-zero elements on and above its diagonal.
 * - The combined L and U matrices are stored in `luMatrix` to save space.
 * - Row permutations, which track row swaps to maintain numerical stability, are stored in `permutations`.
 *
 * **Steps:**
 * 1. **Initialization:**
 *    - Copy the input matrix into `luMatrix`.
 *    - Initialize the `permutations` array to track row indices.
 *    - Start with a parity value of `+1` to track the number of row swaps (even/odd).
 *
 * 2. **Pivoting:**
 *    - For each column, find the row with the largest absolute value in the current column.
 *    - Swap rows in `luMatrix` and update `permutations` to reflect the swap.
 *    - Adjust the parity to reflect the row swap.
 *
 * 3. **LU Factorization:**
 *    - For each column, compute the lower and upper triangular elements:
 *      - Compute the current row for U by subtracting contributions from previous rows.
 *      - Compute the current column for L by dividing by the pivot element.
 *
 * 4. **Return:**
 *    - Return the parity (+1 or -1) based on the number of row swaps. This value can be used
 *      to determine the determinant of the matrix.
 *
 * **Edge Cases:**
 * - If a zero is encountered on the diagonal during pivoting, it may indicate a singular matrix.
 * - The function avoids division by zero by skipping L/U computation if the pivot element is zero.
 *
 * @param matrix - The input square matrix to decompose.
 * @param luMatrix - The resulting combined lower and upper triangular matrix.
 * @param permutations - The resulting permutation vector to track row swaps.
 * @returns +1 for an even number of row permutations, -1 for an odd number.
 */
export function decomposeMatrix(
  matrix: Matrix,
  luMatrix: Matrix,
  permutations: Vector
): number {
  const n = matrix.length;

  // Initialize `luMatrix` and `permutations`
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      luMatrix[i][j] = matrix[i][j];
    }
    permutations[i] = i;
  }

  let parity = +1; // Tracks even (+1) or odd (-1) row permutations

  for (let j = 0; j < n - 1; j++) {
    let max = Math.abs(luMatrix[j][j]);
    let pivotIndex = j;

    // Find the pivot row with the maximum absolute value in column `j`
    for (let i = j + 1; i < n; i++) {
      const diagonalElement = Math.abs(luMatrix[i][j]);
      if (diagonalElement > max) {
        max = diagonalElement;
        pivotIndex = i;
      }
    }

    // Check if the matrix is singular
    if (max === 0) {
      return 0; // Return 0 to indicate a singular matrix
    }

    // Perform row swaps if necessary
    if (pivotIndex !== j) {
      swapArrayElements(luMatrix, pivotIndex, j);
      swapArrayElements(permutations, pivotIndex, j);
      parity = -parity; // Flip parity to reflect the row swap
    }

    const xjj = luMatrix[j][j];
    if (xjj !== 0) {
      // Perform factorization for the lower and upper matrices
      for (let i = j + 1; i < n; i++) {
        const xij = luMatrix[i][j] / xjj;
        luMatrix[i][j] = roundToPrecision(xij);
        for (let k = j + 1; k < n; k++) {
          luMatrix[i][k] -= xij * luMatrix[j][k]; // Update U
          luMatrix[i][k] = roundToPrecision(luMatrix[i][k]); // Normalize result
        }
      }
    }
  }

  return parity; // Return the parity for determinant calculation
}

/**
 * Swaps two elements in an array or matrix (row swap).
 *
 * @param arr - The array containing elements or rows to swap.
 * @param index1 - The index of the first element/row.
 * @param index2 - The index of the second element/row.
 */
function swapArrayElements<T>(arr: T[], index1: number, index2: number): void {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
