module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.js'
  ],
  testMatch: [
    '**/test/**/*.spec.js'
  ],
  verbose: true
}