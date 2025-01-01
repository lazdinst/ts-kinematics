import { buildHomogeneousMatrix } from "../buildHomogeneousMatrix";
import { matrixDotProduct } from "../../utils";
import { Matrix, DHParameters } from "../../definitions";

/**
 * Builds the homogeneous transformation matrices for a Denavit-Hartenberg (DH) table.
 *
 * @param {DHParameters[]} dhTable - The DH table, where each row is an object with the following properties:
 *   - `theta` (number): The rotation angle around the Z-axis (in radians).
 *   - `alpha` (number): The rotation angle around the X-axis (in radians).
 *   - `r` (number): The distance along the X-axis.
 *   - `d` (number): The distance along the Z-axis.
 * @returns {{
 *   individualTransformationMatrices: Matrix[],
 *   cumulativeTransformationMatrix: Matrix
 * }} - An object containing:
 *   - `individualTransformationMatrices`: An array of individual 4x4 homogeneous transformation matrices, one for each row of the DH table.
 *   - `cumulativeTransformationMatrix`: The final combined 4x4 transformation matrix for the entire table.
 *
 * Example:
 * const dhTable = [
 *   { theta: Math.PI / 2, alpha: 0, r: 2, d: 3 },
 *   { theta: Math.PI / 4, alpha: Math.PI / 6, r: 1, d: 4 },
 * ];
 * const result = buildHomogeneousTable(dhTable);
 * console.log(result.individualTransformationMatrices); // Individual matrices
 * console.log(result.cumulativeTransformationMatrix); // Final combined matrix
 */

export const buildHomogeneousTable = (
  dhTable: DHParameters[]
): {
  individualTransformationMatrices: Matrix[];
  cumulativeTransformationMatrix: Matrix;
} => {
  if (!dhTable || !Array.isArray(dhTable) || dhTable.length === 0) {
    throw new Error("Invalid DH table: The table must be a non-empty array.");
  }

  // Step 1: Build individual homogeneous matrices for each row of the DH table
  const individualTransformationMatrices = dhTable.map((row) =>
    // Each row is a DHParameters object
    buildHomogeneousMatrix(row)
  );

  // Step 2: Compute the cumulative transformation matrix
  const cumulativeTransformationMatrix =
    individualTransformationMatrices.reduce((acc, cur) =>
      matrixDotProduct(acc, cur)
    );

  return {
    individualTransformationMatrices,
    cumulativeTransformationMatrix,
  };
};
