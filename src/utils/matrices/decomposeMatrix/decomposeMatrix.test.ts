import { decomposeMatrix } from "./decomposeMatrix";
import { createMatrix, createVector } from "../index";
describe("decomposeMatrix", () => {
  it("performs LU decomposition on a matrix", () => {
    const matrix = [
      [2, 1, 1],
      [4, -6, 0],
      [-2, 7, 2],
    ];
    const lum = createMatrix(3, 3, 0);
    const perm = createVector(3, 0);

    decomposeMatrix(matrix, lum, perm);

    // Updated expected values
    expect(lum).toEqual([
      [4, -6, 0],
      [0.5, 4, 1],
      [-0.5, 1, 1],
    ]);
    expect(perm).toEqual([1, 0, 2]); // Python-style permutation
  });
  it("handles an identity matrix", () => {
    const matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const lum = createMatrix(3, 3, 0);
    const perm = createVector(3, 0);

    decomposeMatrix(matrix, lum, perm);

    expect(lum).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    expect(perm).toEqual([0, 1, 2]);
  });
  it("handles a diagonal matrix", () => {
    const matrix = [
      [3, 0, 0],
      [0, 5, 0],
      [0, 0, 7],
    ];
    const lum = createMatrix(3, 3, 0);
    const perm = createVector(3, 0);

    decomposeMatrix(matrix, lum, perm);

    expect(lum).toEqual(matrix); // LU of a diagonal matrix is the matrix itself
    expect(perm).toEqual([0, 1, 2]);
  });
  it("handles a singular matrix", () => {
    const matrix = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
    ];
    const lum = createMatrix(3, 3, 0);
    const perm = createVector(3, 0);

    const result = decomposeMatrix(matrix, lum, perm);

    expect(result).toBe(0); // Indicating a singular matrix
  });
  it("handles a zero matrix", () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const lum = createMatrix(3, 3, 0);
    const perm = createVector(3, 0);

    const result = decomposeMatrix(matrix, lum, perm);

    expect(result).toBe(0); // Indicating no valid decomposition
    expect(lum).toEqual(matrix);
    expect(perm).toEqual([0, 1, 2]); // No swaps
  });
});
