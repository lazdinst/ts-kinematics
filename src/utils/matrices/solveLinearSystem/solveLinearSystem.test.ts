import { solveLinearSystem } from "./solveLinearSystem";

describe("solveLinearSystem", () => {
  it("solves a linear system using LU decomposition", () => {
    const lum = [
      [4, -6, 0],
      [0.5, 4, 1],
      [-0.5, -0.125, 1.125],
    ];
    const b = [2, -4, 3];
    const result = solveLinearSystem(lum, b);

    expect(result).toEqual([-2.5, -2, 3]);
  });
});
