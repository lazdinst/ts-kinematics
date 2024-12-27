import { buildHomogeneousMatrix } from "./buildHomogeneousMatrix";

describe("buildHomogeneousMatrix", () => {
  test("calculates the correct matrix for a standard input", () => {
    const theta = Math.PI / 4; // 45 degrees
    const alpha = Math.PI / 6; // 30 degrees
    const r = 2;
    const d = 1;

    const result = buildHomogeneousMatrix([theta, alpha, r, d]);
    const expected = [
      [
        Math.cos(theta),
        -Math.sin(theta) * Math.cos(alpha),
        Math.sin(theta) * Math.sin(alpha),
        r * Math.cos(theta),
      ],
      [
        Math.sin(theta),
        Math.cos(theta) * Math.cos(alpha),
        -Math.cos(theta) * Math.sin(alpha),
        r * Math.sin(theta),
      ],
      [0, Math.sin(alpha), Math.cos(alpha), d],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles zero angles correctly", () => {
    const theta = 0;
    const alpha = 0;
    const r = 1;
    const d = 1;

    const result = buildHomogeneousMatrix([theta, alpha, r, d]);
    const expected = [
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles π/2 angles correctly", () => {
    const theta = Math.PI / 2; // 90 degrees
    const alpha = Math.PI / 2; // 90 degrees
    const r = 1;
    const d = 1;

    const result = buildHomogeneousMatrix([theta, alpha, r, d]);
    const expected = [
      [
        Math.cos(theta),
        -Math.sin(theta) * Math.cos(alpha),
        Math.sin(theta) * Math.sin(alpha),
        r * Math.cos(theta),
      ],
      [
        Math.sin(theta),
        Math.cos(theta) * Math.cos(alpha),
        -Math.cos(theta) * Math.sin(alpha),
        r * Math.sin(theta),
      ],
      [0, Math.sin(alpha), Math.cos(alpha), d],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles negative distances correctly", () => {
    const theta = Math.PI / 4; // 45 degrees
    const alpha = Math.PI / 6; // 30 degrees
    const r = -2;
    const d = -1;

    const result = buildHomogeneousMatrix([theta, alpha, r, d]);
    const expected = [
      [
        Math.cos(theta),
        -Math.sin(theta) * Math.cos(alpha),
        Math.sin(theta) * Math.sin(alpha),
        r * Math.cos(theta),
      ],
      [
        Math.sin(theta),
        Math.cos(theta) * Math.cos(alpha),
        -Math.cos(theta) * Math.sin(alpha),
        r * Math.sin(theta),
      ],
      [0, Math.sin(alpha), Math.cos(alpha), d],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });

  test("handles all parameters as zero", () => {
    const theta = 0;
    const alpha = 0;
    const r = 0;
    const d = 0;

    const result = buildHomogeneousMatrix([theta, alpha, r, d]);
    const expected = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    expect(result).toEqual(expected);
  });
});
