import { Matrix } from "../../../definitions";

/**
 * Creates a new matrix filled with a specified value.
 *
 * @param rows - Number of rows in the matrix.
 * @param cols - Number of columns in the matrix.
 * @param fillValue - The value to fill the matrix with.
 * @returns A new matrix.
 */
export function createMatrix(
  rows: number,
  cols: number,
  fillValue: number
): Matrix {
  return Array.from({ length: rows }, () => Array(cols).fill(fillValue));
}
