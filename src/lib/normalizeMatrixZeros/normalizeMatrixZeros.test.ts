import { normalizeMatrixZeros } from "./normalizeMatrixZeros";

describe("normalizeMatrixZeros", () => {
  test("normalizes -0 to 0 in a matrix", () => {
    const matrix = [
      [-0, 1, -0],
      [2, -0, 3],
      [-0, -0, 0],
    ];

    const result = normalizeMatrixZeros(matrix);

    const expected = [
      [0, 1, 0],
      [2, 0, 3],
      [0, 0, 0],
    ];

    expect(result).toEqual(expected);
  });

  test("does not modify non-zero values", () => {
    const matrix = [
      [1, -1, 2],
      [3, 4, -5],
    ];

    const result = normalizeMatrixZeros(matrix);

    expect(result).toEqual(matrix);
  });
});
