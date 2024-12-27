import { normalizeMatrixZeros } from "../normalizeMatrixZeros";

/**
 * Builds the homogeneous transformation matrix for a single set of Denavit-Hartenberg parameters.
 *
 * @param {[number, number, number, number]} dhParams - The DH parameters:
 *   [θ (rotation around Z), α (rotation around X), r (distance along X), d (distance along Z)].
 * @returns {number[][]} - The 4x4 homogeneous transformation matrix for the given parameters.
 */
export const buildHomogeneousMatrix = (
  dhParams: [number, number, number, number]
): number[][] => {
  const [theta, alpha, r, d] = dhParams;

  const matrix = [
    [
      Math.cos(theta),
      -Math.sin(theta) * Math.cos(alpha),
      Math.sin(theta) * Math.sin(alpha),
      r * Math.cos(theta),
    ],
    [
      Math.sin(theta),
      Math.cos(theta) * Math.cos(alpha),
      -Math.cos(theta) * Math.sin(alpha),
      r * Math.sin(theta),
    ],
    [0, Math.sin(alpha), Math.cos(alpha), d],
    [0, 0, 0, 1],
  ];

  return normalizeMatrixZeros(matrix);
};
