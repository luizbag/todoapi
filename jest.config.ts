export default {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
  testEnvironment: "node",
};
