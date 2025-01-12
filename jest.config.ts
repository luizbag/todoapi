export default {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.(ts)$": ["ts-jest", { tsconfig: { rootDir: "." } }],
  },
  testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
  testEnvironment: "node",
};
