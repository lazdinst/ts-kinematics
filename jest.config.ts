/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"], // Match all test files with .test.ts
  moduleFileExtensions: ["ts", "js"], // Support both .ts and .js files
};
