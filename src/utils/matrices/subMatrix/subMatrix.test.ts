import { Matrix } from "../../../definitions";
import { subMatrix } from "./subMatrix";

describe("subMatrix", () => {
  test("returns the correct submatrix for a valid input", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = subMatrix(matrix, 2, 2);
    const expected = [
      [1, 2],
      [4, 5],
    ];

    expect(result).toEqual(expected);
  });

  test("returns the entire matrix when rows and cols match the matrix size", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const result = subMatrix(matrix, 3, 2);
    const expected = matrix;

    expect(result).toEqual(expected);
  });

  test("handles cases where cols is less than the number of columns in the matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = subMatrix(matrix, 1, 3);
    const expected = [[1], [4], [7]];

    expect(result).toEqual(expected);
  });

  test("handles cases where rows is less than the number of rows in the matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = subMatrix(matrix, 3, 2);
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(result).toEqual(expected);
  });

  test("returns an empty matrix when rows or cols is 0", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const result = subMatrix(matrix, 0, 0);
    const expected: Matrix = [];

    expect(result).toEqual(expected);
  });

  test("throws an error when attempting to extract more rows or cols than the matrix has", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => subMatrix(matrix, 4, 2)).toThrow();
    expect(() => subMatrix(matrix, 3, 3)).toThrow();
  });

  test("returns an empty matrix when the input matrix is empty", () => {
    const matrix: Matrix = [];

    const result = subMatrix(matrix, 2, 2);
    const expected: Matrix = [];

    expect(result).toEqual(expected);
  });
});
