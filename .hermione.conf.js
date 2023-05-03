module.exports = {
  gridUrl: "http://localhost:4444/wd/hub",
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
    chrome2: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
  plugins: {
    "allure-hermione": {
      resultsDir: "./allure-results",
    },
  },
};
