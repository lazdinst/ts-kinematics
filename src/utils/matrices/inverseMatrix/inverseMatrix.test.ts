import { inverseMatrix } from "./inverseMatrix";
import { Matrix } from "../../../definitions";
describe("inverseMatrix", () => {
  it("computes the inverse of a 2x2 square matrix", () => {
    const matrix: Matrix = [
      [4, 7],
      [2, 6],
    ];
    const result = inverseMatrix(matrix);

    expect(result).toEqual([
      [0.6, -0.7],
      [-0.2, 0.4],
    ]);
  });

  it("computes the inverse of a 3x3 square matrix", () => {
    const matrix: Matrix = [
      [2, 1, 1],
      [4, -6, 0],
      [-2, 7, 2],
    ];
    const result = inverseMatrix(matrix);

    expect(result).toEqual([
      [0.75, -0.3125, -0.375],
      [0.5, -0.375, -0.25],
      [-1.0, 1.0, 1.0],
    ]);
  });

  it("throws an error for a singular matrix", () => {
    const singularMatrix = [
      [1, 2],
      [2, 4],
    ];

    expect(() => inverseMatrix(singularMatrix)).toThrow(
      "Matrix is singular and cannot be inverted."
    );
  });
});
