import { inverseMatrix } from "./inverseMatrix";
// import {}
describe("inverseMatrix", () => {
  it("computes the inverse of a square matrix", () => {
    const matrix = [
      [4, 7],
      [2, 6],
    ];
    const result = inverseMatrix(matrix);

    expect(result).toEqual([
      [0.6, -0.7],
      [-0.2, 0.4],
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
