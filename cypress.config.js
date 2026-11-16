const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // One retry in `cypress run`, so a test that passes on its second attempt shows up as flaky.
  retries: { runMode: 1, openMode: 0 },
  video: true,
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
})
