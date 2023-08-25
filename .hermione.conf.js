module.exports = {
  gridUrl: "http://localhost:4444/wd/hub",
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
    // chrome2: {
    //   desiredCapabilities: {
    //     browserName: "chrome",
    //   },
    // },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
    "hermione-test-repeater": {
      enabled: false,
      repeat: 10,
      minRepeat: 10,
      maxRepeat: 100,
      uniqSession: true,
    },
  },
};
