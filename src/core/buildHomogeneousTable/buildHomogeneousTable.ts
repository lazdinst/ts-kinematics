import { buildHomogeneousMatrix } from "../buildHomogeneousMatrix";
import { matrixDotProduct } from "../../utils";
import { Matrix } from "../../definitions";

/**
 * Builds the homogeneous transformation matrices for a Denavit-Hartenberg table.
 *
 * @param {[number, number, number, number][]} dhTable - The DH table, where each row represents:
 *   [θ (rotation around Z), α (rotation around X), r (distance along X), d (distance along Z)].
 * @returns {{
 *   individualTransformationMatrices: Matrix[],
 *   cumulativeTransformationMatrix: Matrix
 * }} - An object containing:
 *   - `individualTransformationMatrices`: The homogeneous transformation matrix for each row of the DH table.
 *   - `cumulativeTransformationMatrix`: The final combined transformation matrix for the entire table.
 *
 * Example:
 * const dhTable = [
 *   [Math.PI / 2, 0, 2, 3],
 *   [Math.PI / 4, Math.PI / 6, 1, 4]
 * ];
 * const result = buildHomogeneousTable(dhTable);
 * console.log(result.individualTransformationMatrices); // Individual matrices
 * console.log(result.cumulativeTransformationMatrix); // Final combined matrix
 */
export const buildHomogeneousTable = (
  dhTable: [number, number, number, number][]
): {
  individualTransformationMatrices: Matrix[];
  cumulativeTransformationMatrix: Matrix;
} => {
  if (!dhTable || !Array.isArray(dhTable) || dhTable.length === 0) {
    throw new Error("Invalid DH table: The table must be a non-empty array.");
  }

  // Step 1: Build individual homogeneous matrices for each row of the DH table
  const individualTransformationMatrices = dhTable.map((row) =>
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
