const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ["text"],
    moduleFileExtensions: ["js", "json"],
    moduleNameMapper: {
        "^@js/(.*)$": "<rootDir>/src/js/$1",
    },
    resetMocks: true,
    roots: ["<rootDir>/src/js", "<rootDir>/tests"],
    testEnvironment: "jsdom",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    },
};

module.exports = config;
