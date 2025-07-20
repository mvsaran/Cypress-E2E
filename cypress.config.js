const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // ✅ Add Allure writer plugin
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
  },
  env: {
    Url: "https://www.saucedemo.com/",
    allure: true, // ✅ This tells Cypress to enable Allure results
  },
  // ✅ No need for Mochawesome reporter anymore
});
