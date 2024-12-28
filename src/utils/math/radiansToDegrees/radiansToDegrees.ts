import { roundToPrecision } from "../roundToPrecision";
/**
 * Converts radians to degrees.
 *
 * @param {number} rad - The angle in radians.
 * @returns {number} - The angle in degrees.
 */
export const radiansToDegrees = (rad: number): number => {
  return roundToPrecision(180 * (rad / Math.PI));
};

export default radiansToDegrees;
