import { Matrix } from "../../../definitions";
import { mapMatrix } from "../mapMatrix";
import { roundToPrecision } from "../../math";

/**
 * Computes the Z-X-Z Euler rotation matrix.
 *
 * This function calculates the rotation matrix for a Z-X-Z rotation sequence
 * using the provided angles: alpha (Z-axis), beta (X-axis), and gamma (Z-axis).
 *
 * @param {number} alpha - The rotation angle around the initial Z-axis (in radians).
 * @param {number} beta - The rotation angle around the X-axis (in radians).
 * @param {number} gamma - The rotation angle around the final Z-axis (in radians).
 * @returns {Matrix} - The resulting 3x3 rotation matrix.
 */
export const eulerZXZRotation = (
  alpha: number,
  beta: number,
  gamma: number
): Matrix => {
  const cosAlpha = Math.cos(alpha);
  const sinAlpha = Math.sin(alpha);
  const cosBeta = Math.cos(beta);
  const sinBeta = Math.sin(beta);
  const cosGamma = Math.cos(gamma);
  const sinGamma = Math.sin(gamma);

  const rotationMatrix = [
    [
      cosAlpha * cosGamma - sinAlpha * cosBeta * sinGamma,
      -cosAlpha * sinGamma - sinAlpha * cosBeta * cosGamma,
      sinAlpha * sinBeta,
    ],
    [
      sinAlpha * cosGamma + cosAlpha * cosBeta * sinGamma,
      -sinAlpha * sinGamma + cosAlpha * cosBeta * cosGamma,
      -cosAlpha * sinBeta,
    ],
    [sinBeta * sinGamma, sinBeta * cosGamma, cosBeta],
  ];

  return mapMatrix(rotationMatrix, (value) => roundToPrecision(value));
};
