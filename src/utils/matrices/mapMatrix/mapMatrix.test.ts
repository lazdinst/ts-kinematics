import { Matrix } from "../../../definitions";
import { mapMatrix } from "./mapMatrix";

describe("mapMatrix", () => {
  test("applies the callback to all elements of the matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const result = mapMatrix(matrix, (value) => value * 2);
    const expected = [
      [2, 4],
      [6, 8],
    ];
    expect(result).toEqual(expected);
  });

  test("handles an empty matrix", () => {
    const matrix: Matrix = [];
    const result = mapMatrix(matrix, (value) => value * 2);
    const expected: Matrix = [];
    expect(result).toEqual(expected);
  });

  test("handles a single-row matrix", () => {
    const matrix = [[1, 2, 3]];
    const result = mapMatrix(matrix, (value) => value + 1);
    const expected = [[2, 3, 4]];
    expect(result).toEqual(expected);
  });

  test("handles a single-column matrix", () => {
    const matrix = [[1], [2], [3]];
    const result = mapMatrix(matrix, (value) => value - 1);
    const expected = [[0], [1], [2]];
    expect(result).toEqual(expected);
  });

  test("handles a matrix with all zeros", () => {
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    const result = mapMatrix(matrix, (value) => value + 1);
    const expected = [
      [1, 1],
      [1, 1],
    ];
    expect(result).toEqual(expected);
  });

  test("handles a large matrix", () => {
    const matrix = Array.from({ length: 100 }, () =>
      Array.from({ length: 100 }, (_, index) => index)
    );
    const result = mapMatrix(matrix, (value) => value * 2);
    expect(result).toHaveLength(100);
    expect(result[0]).toHaveLength(100);
    expect(result[0][0]).toBe(0); // First element is 0 * 2
    expect(result[0][99]).toBe(198); // Last element in first row is 99 * 2
  });

  test("throws an error if callback is not a function", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(() =>
      // @ts-expect-error Testing invalid input
      mapMatrix(matrix, undefined)
    ).toThrow(TypeError);
  });
});
