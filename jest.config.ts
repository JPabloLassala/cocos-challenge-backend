export default {
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@([^/]+)$": "<rootDir>/src/$1",
  },
};
