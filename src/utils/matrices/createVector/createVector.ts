import { Vector } from "../../../definitions";
/**
 * Creates a new vector filled with a specified value.
 *
 * @param size - Size of the vector.
 * @param fillValue - The value to fill the vector with.
 * @returns A new vector.
 */
export function createVector(size: number, fillValue: number): Vector {
  return Array(size).fill(fillValue);
}
