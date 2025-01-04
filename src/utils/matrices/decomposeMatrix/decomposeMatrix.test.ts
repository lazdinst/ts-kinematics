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

    expect(lum).toEqual([
      [4, -6, 0],
      [0.5, 4, 1],
      [-0.5, -0.125, 1.125],
    ]);
    expect(perm).toEqual([1, 2, 0]);
  });
});
