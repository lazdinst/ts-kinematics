import { mapMatrix } from "./mapMatrix";
import { normalizeAndRoundValue } from "../../math/normalizeAndRoundValue";

describe("mapMatrix", () => {
  test("applies the callback to all elements of the matrix", () => {
    const matrix = [
      [1.123456789, -0.000001],
      [42, 0.987654321],
    ];
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    const expected = [
      [1.123457, 0],
      [42, 0.987654],
    ];
    expect(result).toEqual(expected);
  });

  test("handles an empty matrix", () => {
    const matrix: number[][] = [];
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    const expected: number[][] = [];
    expect(result).toEqual(expected);
  });

  test("handles a single-row matrix", () => {
    const matrix = [[1.123456789, -0.000001]];
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    const expected = [[1.123457, 0]];
    expect(result).toEqual(expected);
  });

  test("handles a single-column matrix", () => {
    const matrix = [[1.123456789], [-0.000001], [42]];
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    const expected = [[1.123457], [0], [42]];
    expect(result).toEqual(expected);
  });

  test("handles a matrix with all zeros", () => {
    const matrix = [
      [0, -0],
      [0, -0],
    ];
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    const expected = [
      [0, 0],
      [0, 0],
    ];
    expect(result).toEqual(expected);
  });

  test("handles a large matrix", () => {
    const matrix = Array.from({ length: 1000 }, () =>
      Array.from({ length: 1000 }, () => Math.random())
    );
    const result = mapMatrix(matrix, (value) =>
      normalizeAndRoundValue(value, 6)
    );
    expect(result).toHaveLength(1000);
    expect(result[0]).toHaveLength(1000);
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
