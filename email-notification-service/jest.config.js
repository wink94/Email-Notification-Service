module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/config/",
    "<rootDir>/src/config/",
    "<rootDir>/src/models/",
    "__mock__",
  ],
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/__tests__/*.test.js"],
  collectCoverageFrom: [
    "!src/config/**",
    "!src/models/**",
    "!src/**/index.js",
    "!src/utils/constants.js",
    "!src/utils/logger.js",
    "!src/**/__mock__",
    "src/**/*.js",
  ],
};
