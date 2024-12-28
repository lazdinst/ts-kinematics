import { Matrix } from "../../../definitions";
import { matrixDotProduct } from "./matrixDotProduct";

describe("matrixDotProduct", () => {
  test("computes the dot product of two 2x2 matrices", () => {
    const matrix1 = [
      [1, 2],
      [3, 4],
    ];
    const matrix2 = [
      [5, 6],
      [7, 8],
    ];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected = [
      [19, 22],
      [43, 50],
    ];

    expect(result).toEqual(expected);
  });

  test("computes the dot product of a 2x3 and 3x2 matrix", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected = [
      [58, 64],
      [139, 154],
    ];

    expect(result).toEqual(expected);
  });

  test("computes the dot product of a 3x3 matrix and an identity matrix", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const identityMatrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    const result = matrixDotProduct(matrix1, identityMatrix);
    const expected = matrix1;

    expect(result).toEqual(expected);
  });

  test("throws an error when the number of columns in the first matrix does not match the number of rows in the second matrix", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [7, 8],
      [9, 10],
    ]; // Invalid dimensions for dot product

    expect(() => matrixDotProduct(matrix1, matrix2)).toThrow(
      "The number of columns in matrix1 must equal the number of rows in matrix2."
    );
  });

  test("computes the dot product of a single-row matrix and a single-column matrix", () => {
    const matrix1 = [[1, 2, 3]];
    const matrix2 = [[4], [5], [6]];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected = [[32]]; // 1*4 + 2*5 + 3*6 = 32

    expect(result).toEqual(expected);
  });

  test("computes the dot product of a single-column matrix and a single-row matrix", () => {
    const matrix1 = [[1], [2], [3]];
    const matrix2 = [[4, 5, 6]];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected = [
      [4, 5, 6],
      [8, 10, 12],
      [12, 15, 18],
    ];

    expect(result).toEqual(expected);
  });

  test("handles floating-point precision issues correctly", () => {
    const matrix1 = [
      [0.1, 0.2],
      [0.3, 0.4],
    ];
    const matrix2 = [
      [0.5, 0.6],
      [0.7, 0.8],
    ];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected = [
      [0.19, 0.22],
      [0.43, 0.5],
    ];

    expect(result).toEqual(expected);
  });

  test("computes the dot product of empty matrices", () => {
    const matrix1: Matrix = [];
    const matrix2: Matrix = [];

    const result = matrixDotProduct(matrix1, matrix2);
    const expected: Matrix = [];

    expect(result).toEqual(expected);
  });
});
