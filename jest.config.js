'use strict';

module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageThresholds: {
    global: {
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80
    }
  },
  testResultsProcessor: 'jest-junit',
  reporters: ['default', 'jest-junit'],
  testMatch: [
    '**/__tests__/**/*.test.js'
  ]
};
