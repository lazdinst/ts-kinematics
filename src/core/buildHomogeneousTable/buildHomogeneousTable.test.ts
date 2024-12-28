import { buildHomogeneousTable } from "./buildHomogeneousTable";
import { Matrix } from "../../definitions";

describe("buildHomogeneousTable", () => {
  test("computes individual and cumulative matrices for a standard DH table", () => {
    const dhTable: [number, number, number, number][] = [
      [Math.PI / 2, 0, 2, 3],
      [Math.PI / 4, Math.PI / 6, 1, 4],
    ];

    const result = buildHomogeneousTable(dhTable);

    const expectedIndividual: Matrix[] = [
      [
        [0, -1, 0, 0],
        [1, 0, 0, 2],
        [0, 0, 1, 3],
        [0, 0, 0, 1],
      ],
      [
        [0.707107, -0.353553, 0.612372, 0.707107],
        [0.707107, 0.353553, -0.612372, 0.707107],
        [0, 0.866025, 0.5, 4],
        [0, 0, 0, 1],
      ],
    ];

    const expectedCumulative: Matrix = [
      [0.5, -0.707107, 0.5, 1.5],
      [0.5, 0.707107, -0.5, 4.5],
      [0.707107, 0, 0.707107, 7.12132],
      [0, 0, 0, 1],
    ];

    expect(result.individualTransformationMatrices).toEqual(expectedIndividual);
    expect(result.cumulativeTransformationMatrix).toEqual(expectedCumulative);
  });

  test("handles an empty DH table gracefully", () => {
    expect(() => buildHomogeneousTable([])).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );
  });

  test("handles a single row in the DH table", () => {
    const dhTable: [number, number, number, number][] = [
      [0, Math.PI / 2, 1, 1],
    ];

    const result = buildHomogeneousTable(dhTable);

    const expectedIndividual: Matrix[] = [
      [
        [1, 0, 0, 1],
        [0, 0, -1, 0],
        [0, 1, 0, 1],
        [0, 0, 0, 1],
      ],
    ];

    const expectedCumulative: Matrix = expectedIndividual[0];

    expect(result.individualTransformationMatrices).toEqual(expectedIndividual);
    expect(result.cumulativeTransformationMatrix).toEqual(expectedCumulative);
  });

  test("handles zero angles and distances", () => {
    const dhTable: [number, number, number, number][] = [[0, 0, 0, 0]];

    const result = buildHomogeneousTable(dhTable);

    const expectedIndividual: Matrix[] = [
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
    ];

    const expectedCumulative: Matrix = expectedIndividual[0];

    expect(result.individualTransformationMatrices).toEqual(expectedIndividual);
    expect(result.cumulativeTransformationMatrix).toEqual(expectedCumulative);
  });

  test("throws an error for invalid input (non-array input)", () => {
    // @ts-expect-error - Simulating invalid input
    expect(() => buildHomogeneousTable(null)).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );

    // @ts-expect-error - Simulating invalid input
    expect(() => buildHomogeneousTable(undefined)).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );
  });

  test("throws an error for invalid rows in the DH table", () => {
    // Fewer than 4 elements in a row
    const invalidDHTable: any = [[Math.PI / 2, 0, 2]];

    expect(() => buildHomogeneousTable(invalidDHTable)).toThrowError();
  });
});
