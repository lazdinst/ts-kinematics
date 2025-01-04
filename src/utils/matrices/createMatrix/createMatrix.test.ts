import { createMatrix } from "./createMatrix";

describe("createMatrix", () => {
  it("creates a matrix filled with a specified value", () => {
    const rows = 3;
    const cols = 4;
    const fillValue = 7;
    const result = createMatrix(rows, cols, fillValue);
    expect(result).toEqual([
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ]);
  });

  it("creates an empty matrix when rows or cols are 0", () => {
    expect(createMatrix(0, 3, 1)).toEqual([]);
    expect(createMatrix(3, 0, 1)).toEqual([[], [], []]);
  });
});
