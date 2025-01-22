# ts-kinematics

A TypeScript library for calculating forward and inverse kinematics for 6-DOF robotic arms. This library provides:

- **Forward Kinematics**: Given joint angles and robot parameters, compute the end-effector’s pose (position & orientation).
- **Inverse Kinematics**: Given the end-effector’s desired pose and robot parameters, compute the required joint angles.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Forward Kinematics](#forward-kinematics)
  - [Inverse Kinematics](#inverse-kinematics)
- [API Reference](#api-reference)
- [Example](#example)
- [License](#license)

---

## Features

- **Easy-to-use** TypeScript functions for forward and inverse kinematics
- **Configurable** robotic link parameters for various 6-DOF arms
- **Modular** functions that can be used independently or combined
- **Well-documented** code with JSDoc annotations

---

## NPM

`https://www.npmjs.com/package/ts-kinematics`

## Installation

    npm install ts-kinematics

Or if you use Yarn:

    yarn add ts-kinematics

---

## Usage

Below are quick examples showing how to use `forward` and `inverseKinematics`.  
Make sure to import the functions and the necessary types from the library.

### Forward Kinematics

```ts
import { forward } from "ts-kinematics";

// Example joint angles in radians
const jointAngles = {
  theta1: 0,
  theta2: 0,
  theta3: -Math.PI / 2,
  theta4: Math.PI,
  theta5: -Math.PI / 2,
  theta6: 0,
};

// Example robot configuration
const config = {
  base: 0,
  v1: 2.5,
  v2: 3,
  v3: 2.5,
  v4: 2.5,
  v5: 2.5,
  v6: 2,
};

// Compute the forward kinematics
const transformationMatrix = forward({
  ...jointAngles,
  config,
});

console.log("Forward Kinematics Result:", transformationMatrix);
```

### Inverse Kinematics

```ts
import { inverseKinematics } from "ts-kinematics";

// Desired end-effector position & orientation
const targetPosition = { x: 5, y: 2, z: 3 };
const targetOrientation = { r1: 0, r2: Math.PI / 2, r3: 0 }; // Euler Z-X-Z angles

// Robot configuration
const config = {
  base: 0,
  v1: 2.5,
  v2: 3,
  v3: 2.5,
  v4: 2.5,
  v5: 2.5,
  v6: 2,
  flip: true,
};

// Calculate the inverse kinematics
const angles = inverseKinematics({
  ...targetPosition,
  ...targetOrientation,
  config,
});

console.log("Inverse Kinematics Joint Angles:", angles);
```

---

## API Reference

### Functions

1. **forward(args: ForwardKinematicsArgs): Matrix**

   - Computes the 4x4 transformation matrix for the end-effector.

2. **inverseKinematics(args: InverseKinematicsProps): number[]**

   - Computes the array of joint angles [θ1, θ2, θ3, θ4, θ5, θ6].

3. **inverseKinematics1to3(...)**

   - Helper function to compute joints 1–3.

4. **matrixDotProduct**, **subMatrix**, **inverseMatrix**, **eulerZXZRotation**
   - Utility matrix operations.

### Types

**ForwardKinematicsArgs**

```ts
interface ForwardKinematicsArgs {
  theta1: number;
  theta2: number;
  theta3: number;
  theta4: number;
  theta5: number;
  theta6: number;
  config: RobotConfig;
}
```

**InverseKinematicsProps**

```ts
interface InverseKinematicsProps {
  x: number;
  y: number;
  z: number;
  r1: number;
  r2: number;
  r3: number;
  config: RobotConfig;
}
```

**RobotConfig**

```ts
interface RobotConfig {
  base?: number;
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
  v6: number;
  x0?: number;
  y0?: number;
  adjustments?: { t1?: number };
  flip?: boolean;
}
```

**Matrix**

```ts
type Matrix = number[][];
```

---

## Example

A more complete example to illustrate usage:

```ts
import { forward, inverseKinematics } from "ts-kinematics";

// Define joint angles
const jointAngles = {
  theta1: 0,
  theta2: 0,
  theta3: 0,
  theta4: Math.PI / 2,
  theta5: 0,
  theta6: 0,
};

// Define robot config
const config = {
  base: 0,
  v1: 2.5,
  v2: 3,
  v3: 2.5,
  v4: 2.5,
  v5: 2.5,
  v6: 2,
  flip: true,
};

// Forward kinematics
const fkResult = forward({ ...jointAngles, config });
console.log("FK Matrix:", fkResult);

// Suppose we want the end effector at x=4, y=1, z=3, with orientation Euler ZXZ: (0, π/2, 0)
const ikResult = inverseKinematics({
  x: 4,
  y: 1,
  z: 3,
  r1: 0,
  r2: Math.PI / 2,
  r3: 0,
  config,
});
console.log("IK Joint Angles:", ikResult);
```

---

## License

[MIT](./LICENSE)

---

**Note:** This library assumes standard Denavit-Hartenberg conventions, and uses angles in **radians**. Make sure to convert degrees to radians where necessary!
