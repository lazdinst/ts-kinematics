import { Matrix } from "../../definitions";
import { areMatricesEqual } from "./areMatricesEqual";

describe("areMatricesEqual", () => {
  test("returns true for two identical matrices", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(true);
  });

  test("returns false for matrices with different dimensions", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [1, 2],
      [4, 5],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("returns false for matrices with same dimensions but different values", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [1, 2, 3],
      [4, 5, 7], // Different value here
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("returns true for two empty matrices", () => {
    const matrix1: Matrix = [];
    const matrix2: Matrix = [];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(true);
  });

  test("returns false when one matrix is empty and the other is not", () => {
    const matrix1: Matrix = [];
    const matrix2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("returns true for single-element matrices with the same value", () => {
    const matrix1 = [[42]];
    const matrix2 = [[42]];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(true);
  });

  test("returns false for single-element matrices with different values", () => {
    const matrix1 = [[42]];
    const matrix2 = [[24]];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("returns false for matrices with rows of different lengths", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [1, 2],
      [4, 5],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("handles matrices with negative values and returns true for identical matrices", () => {
    const matrix1 = [
      [-1, -2, -3],
      [-4, -5, -6],
    ];
    const matrix2 = [
      [-1, -2, -3],
      [-4, -5, -6],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(true);
  });

  test("returns false when one matrix is empty and the other is not", () => {
    const matrix1: Matrix = [];
    const matrix2 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(areMatricesEqual(matrix1, matrix2)).toBe(false);
  });

  test("returns false when matrices differ in negative zero representation", () => {
    const matrix1 = [
      [0, 1],
      [2, 3],
    ];
    const matrix2 = [
      [-0, 1],
      [2, 3],
    ];

    expect(areMatricesEqual(matrix1, matrix2)).toBe(false); // Distinguishes 0 from -0
  });
});
