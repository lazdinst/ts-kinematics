import { inverseKinematics } from "./inverseKinematics";
import { RobotConfig, InverseKinematicsProps } from "../../definitions";
import { roundToPrecision, degreesToRadians } from "../../utils";

const robotConfig: RobotConfig = {
  v1: 2.5,
  v2: 3,
  v3: 2.5,
  v4: 2.5,
  v5: 2.5,
  v6: 2,
  flip: false,
};
describe("inverse_kinematics", () => {
  /**
   *     |
   *    [ ]
   *     |
   *    ( )
   *     |
   *    [ ]
   *     |
   *    ( )
   *     |
   *    ( )
   *     |
   *    [ ]
   */
  it("should take inverse of 0, 0, 15, 0, 0, 0", () => {
    const input: InverseKinematicsProps = {
      x: 0,
      y: 0,
      z: 15,
      r1: 0,
      r2: 0,
      r3: 0,
      config: robotConfig,
    };
    const expected = [0, 0, 0, 0, 0, 0].map((value) => roundToPrecision(value));
    expect(inverseKinematics(input)).toEqual(expected);
  });
  /**
   *                  [ ]
   *                   |
   *    ( ) -- [ ] -- ( )
   *     |
   *    ( )
   *     |
   *    [ ]
   *
   * Expected: theta1=0 (aligned with x-axis), theta2=0, theta3=-90 degrees (elbow bend)
   */
  it("should take inverse of 5, 0, 10, 0, 0, 0", () => {
    const input: InverseKinematicsProps = {
      x: 5,
      y: 0,
      z: 10,
      r1: 0,
      r2: 0,
      r3: 0,
      config: robotConfig,
    };

    const expected = [0, 0, -Math.PI / 2, Math.PI, -Math.PI / 2, 0].map(
      (value) => roundToPrecision(value)
    );

    expect(inverseKinematics(input)).toEqual(expected);
  });

  /**
   *    [ ]
   *     |
   *    [ ] -- ( ) -- ( )
   *                   |
   *                  ( )
   *                   |
   *                  [ ]
   */
  it("should take inverse of -5, 0, 10, 0, 0, 0", () => {
    const input: InverseKinematicsProps = {
      x: -5,
      y: 0,
      z: 10,
      r1: 0,
      r2: 0,
      r3: 0,
      config: robotConfig,
    };

    const expected = [
      Math.PI,
      0,
      -Math.PI / 2,
      Math.PI,
      -Math.PI / 2,
      -Math.PI,
    ].map((value) => roundToPrecision(value));

    expect(inverseKinematics(input)).toEqual(expected);
  });

  /**
   *
   *
   *    ( ) -- [ ] -- ( ) -- [ ]
   *     |
   *    ( )
   *     |
   *    [ ]
   */
  it("should take inverse of 9.5, 0, 5.5, -d90, -d90, 0", () => {
    const d90 = degreesToRadians(90);
    const input: InverseKinematicsProps = {
      x: 9.5,
      y: 0,
      z: 5.5,
      r1: -d90,
      r2: -d90,
      r3: 0,
      config: robotConfig,
    };
    const expected = [0, 0, -Math.PI / 2, 0, 0, 0].map((value) =>
      roundToPrecision(value)
    );
    expect(inverseKinematics(input)).toEqual(expected);
  });

  /**
   *                  [ ]
   *                   |
   *    ( ) -- [ ] -- ( )
   *     |
   *    ( )
   *     |
   *    [ ]
   */
  it("should take inverse of 5, 0, 10, 0, 0, 0 when flip is turned on", () => {
    const input: InverseKinematicsProps = {
      x: 5,
      y: 0,
      z: 10,
      r1: 0,
      r2: 0,
      r3: 0,
      config: { ...robotConfig, flip: true },
    };
    const expected = [0, 0, -Math.PI / 2, 0, Math.PI / 2, 0].map((value) =>
      roundToPrecision(value)
    );

    expect(inverseKinematics(input)).toEqual(expected);
  });

  /**
   *    [ ]
   *     |
   *    [ ] -- ( ) -- ( )
   *                   |
   *                  ( )
   *                   |
   *                  [ ]
   */
  it("should take inverse of -5, 0, 10, 0, 0, 0 when flip is turned on", () => {
    const input: InverseKinematicsProps = {
      x: -5,
      y: 0,
      z: 10,
      r1: 0,
      r2: 0,
      r3: 0,
      config: { ...robotConfig, flip: true },
    };
    const expected = [Math.PI, 0, -Math.PI / 2, 0, Math.PI / 2, 0].map(
      (value) => roundToPrecision(value)
    );
    expect(inverseKinematics(input)).toEqual(expected);
  });
});
