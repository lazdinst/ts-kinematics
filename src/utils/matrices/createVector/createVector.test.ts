import { createVector } from "./createVector";

describe("createVector", () => {
  it("creates a vector filled with a specified value", () => {
    const size = 5;
    const fillValue = 2;
    const result = createVector(size, fillValue);
    expect(result).toEqual([2, 2, 2, 2, 2]);
  });

  it("creates an empty vector when size is 0", () => {
    expect(createVector(0, 1)).toEqual([]);
  });
});
