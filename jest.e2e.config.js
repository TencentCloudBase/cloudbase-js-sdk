module.exports = {
  globalSetup: './test/e2e/global_setup.js',
  globalTeardown: './test/e2e/global_teardown.js',
  testEnvironment: './test/e2e/environment.js',
  setupFilesAfterEnv: ['./test/e2e/setup.js']
};