import { composeDHTableMatrices } from "./composeDHTableMatrices";
import { Matrix, DHParameters } from "../../definitions";

describe("composeDHTableMatrices", () => {
  test("computes individual and cumulative matrices for a standard DH table", () => {
    const dhTable: DHParameters[] = [
      { theta: Math.PI / 2, alpha: 0, r: 2, d: 3 },
      { theta: Math.PI / 4, alpha: Math.PI / 6, r: 1, d: 4 },
    ];
    const result = composeDHTableMatrices(dhTable);

    const expectedIndividual: Matrix[] = [
      [
        [0, -1, 0, 0],
        [1, 0, 0, 2],
        [0, 0, 1, 3],
        [0, 0, 0, 1],
      ],
      [
        [0.707107, -0.612372, 0.353553, 0.707107],
        [0.707107, 0.612372, -0.353553, 0.707107],
        [0, 0.5, 0.866025, 4],
        [0, 0, 0, 1],
      ],
    ];

    const expectedCumulative: Matrix = [
      [-0.707107, -0.612372, 0.353553, -0.707107],
      [0.707107, -0.612372, 0.353553, 2.70711],
      [0, 0.5, 0.866025, 7],
      [0, 0, 0, 1],
    ];

    expect(result.individualTransformationMatrices).toEqual(expectedIndividual);
    expect(result.cumulativeTransformationMatrix).toEqual(expectedCumulative);
  });

  test("handles an empty DH table gracefully", () => {
    expect(() => composeDHTableMatrices([])).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );
  });

  test("handles a single row in the DH table", () => {
    const dhTable: DHParameters[] = [
      { theta: 0, alpha: Math.PI / 2, r: 1, d: 1 },
    ];

    const result = composeDHTableMatrices(dhTable);

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
    const dhTable: DHParameters[] = [{ theta: 0, alpha: 0, r: 0, d: 0 }];

    const result = composeDHTableMatrices(dhTable);

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
    expect(() => composeDHTableMatrices(null)).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );

    // @ts-expect-error - Simulating invalid input
    expect(() => composeDHTableMatrices(undefined)).toThrowError(
      "Invalid DH table: The table must be a non-empty array."
    );
  });

  test("throws an error for invalid rows in the DH table", () => {
    // Fewer than 4 elements in a row
    const invalidDHTable: any = [[Math.PI / 2, 0, 2]];

    expect(() => composeDHTableMatrices(invalidDHTable)).toThrowError();
  });
});
