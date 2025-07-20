const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome/json",
    overwrite: false,
    html: false,   // ✅ no HTML here!
    json: true     // ✅ only JSON here!
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    Url: "https://www.saucedemo.com/",
  },
});
