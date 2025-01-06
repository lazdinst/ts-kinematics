import { Matrix } from "../../../definitions";
import { mapMatrix } from "../mapMatrix";
import { roundToPrecision } from "../../math";

/**
 * Computes the X-Y-Z Euler rotation matrix (Yaw, Pitch, Roll).
 *
 * This function calculates the rotation matrix for an X-Y-Z rotation sequence
 * using the provided angles: yaw (Z-axis), pitch (Y-axis), and roll (X-axis).
 *
 * @param {number} yaw - The rotation angle around the Z-axis (in radians).
 * @param {number} pitch - The rotation angle around the Y-axis (in radians).
 * @param {number} roll - The rotation angle around the X-axis (in radians).
 * @returns {Matrix} - The resulting 3x3 rotation matrix.
 */
export const eulerXYZRotation = (
  yaw: number,
  pitch: number,
  roll: number
): Matrix => {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);
  const cosRoll = Math.cos(roll);
  const sinRoll = Math.sin(roll);

  const rotationMatrix = [
    [
      cosYaw * cosPitch,
      cosYaw * sinPitch * sinRoll - sinYaw * cosRoll,
      cosYaw * sinPitch * cosRoll + sinYaw * sinRoll,
    ],
    [
      sinYaw * cosPitch,
      sinYaw * sinPitch * sinRoll + cosYaw * cosRoll,
      sinYaw * sinPitch * cosRoll - cosYaw * sinRoll,
    ],
    [-sinPitch, cosPitch * sinRoll, cosPitch * cosRoll],
  ];

  return mapMatrix(rotationMatrix, (value) => roundToPrecision(value));
};
