import { inverseKinematics1to3 } from "./inverseKinematics1to3";
import { roundToPrecision } from "../../utils";
import { degreesToRadians } from "../../utils";
import { RobotConfig, InverseKinematics1to3Result } from "../../definitions";

const robotConfig: RobotConfig = {
  v1: 1, // a1
  v2: 1, // a2
  v3: 1, // a3
  v4: 0, // a4
  v5: 0,
  v6: 0,
};

describe("inverseKinematics1to3", () => {
  it("should take inverse of 0, 0, 3", () => {
    const result = inverseKinematics1to3(0, 0, 3, robotConfig);
    const expected: InverseKinematics1to3Result = {
      theta1: 0,
      theta2: 0,
      theta3: 0,
    };

    expect(result).toEqual(expected);
  });

  it("should take inverse of 1, 0, 2", () => {
    const result = inverseKinematics1to3(1, 0, 2, robotConfig);
    const expected = {
      theta1: 0,
      theta2: 0,
      theta3: roundToPrecision(degreesToRadians(-90)),
    };

    expect(result).toEqual(expected);
  });

  it("should take inverse of 2, 0, 1", () => {
    const result = inverseKinematics1to3(2, 0, 1, robotConfig);
    const expected = {
      theta1: 0,
      theta2: roundToPrecision(degreesToRadians(-90)),
      theta3: 0,
    };

    expect(result).toEqual(expected);
  });

  it("should take inverse of -1, 0, 0", () => {
    const result = inverseKinematics1to3(-1, 0, 0, robotConfig);
    const expected = {
      theta1: roundToPrecision(Math.PI),
      theta2: roundToPrecision(degreesToRadians(-90)),
      theta3: roundToPrecision(degreesToRadians(-90)),
    };

    expect(result).toEqual(expected);
  });

  it("should take inverse of -1, 0, 2", () => {
    const result = inverseKinematics1to3(-1, 0, 2, robotConfig);
    const expected = {
      theta1: roundToPrecision(Math.PI),
      theta2: 0,
      theta3: roundToPrecision(degreesToRadians(-90)),
    };

    expect(result).toEqual(expected);
  });
});
