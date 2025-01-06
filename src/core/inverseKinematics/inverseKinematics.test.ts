import { inverseKinematics } from "./inverseKinematics";
import { RobotConfig, InverseKinematicsProps } from "../../definitions";

const robotConfig: RobotConfig = {
  v1: 2.5, // 2.5
  v2: 3, // 3
  v3: 2.5, // 2.5
  v4: 2.5, // 2.5
  v5: 2.5, // 2.5
  v6: 2, // 2
  flip: false,
};

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

  expect(inverseKinematics(input)).toEqual([
    0,
    0,
    -Math.PI / 2,
    Math.PI,
    -Math.PI / 2,
    0,
  ]);
});
