export default {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.(ts)$": ["ts-jest", { tsconfig: { rootDir: "." } }],
  },
  testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
  testEnvironment: "node",
  globalSetup: "<rootDir>/jest.globalSetup.ts",
  globalTeardown: "<rootDir>/jest.globalTeardown.ts",
};
