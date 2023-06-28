module.exports = {
    gridUrl: 'http://localhost:4444/wd/hub',
    sessionsPerBrowser: 5,
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
        },
        chrome2:  {
            desiredCapabilities: {
                browserName: 'chrome'
            },
        },
    }
};
