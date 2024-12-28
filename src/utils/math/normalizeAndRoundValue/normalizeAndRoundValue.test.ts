import { normalizeValue } from "../normalizeValue";
import { roundToPrecision } from "../roundToPrecision";

export function normalizeAndRoundValue(
  n: number,
  precision: number = 1000000
): number {
  return normalizeValue(roundToPrecision(n, precision));
}
