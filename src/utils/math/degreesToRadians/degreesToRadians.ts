import { roundToPrecision } from "../roundToPrecision";
/**
 * Converts degrees to radians.
 *
 * @param {number} deg - The angle in degrees.
 * @returns {number} - The angle in radians.
 */
export const degreesToRadians = (deg: number): number => {
  return roundToPrecision((deg / 180) * Math.PI);
};

export default degreesToRadians;
