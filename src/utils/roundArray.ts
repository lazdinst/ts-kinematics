import { roundToPrecision } from "./roundToPrecision";

/**
 * Rounds each number in an array to a fixed precision and removes negative zeros.
 *
 * @param {number[]} array - The array of numbers to round.
 * @returns {number[]} - The rounded array with negative zeros replaced by positive zeros.
 */
export const roundArray = (array: number[]): number[] => {
  return array.map((value) => {
    let rounded = roundToPrecision(value);
    return Object.is(rounded, -0) ? 0 : rounded; // Replace negative zero with zero
  });
};
