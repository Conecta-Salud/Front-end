/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests/unit"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.ts"],
  testMatch: ["**/*.test.(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/unit/mocks/styleMock.cjs",
    "\\.(svg|png|jpg|jpeg|gif|webp|avif)$":
      "<rootDir>/tests/unit/mocks/fileMock.cjs",
  },
  collectCoverageFrom: [
    "src/features/**/utils/**/*.{ts,tsx}",
    "src/components/ui/Filter/**/*.{ts,tsx}",
    "src/components/ui/LocationInput/LocationInput.tsx",
    "src/components/ui/RankingTable/RankingTable.tsx",
    "src/components/ui/SearchBar/SearchBar.tsx",
    "src/routes/**/*.{ts,tsx}",
    "!src/**/*.stories.*",
    "!src/**/*.types.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
