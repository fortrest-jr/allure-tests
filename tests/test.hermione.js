const {assert} = require('chai');

hermione.only.in(['chrome', 'chrome2']);
it('should pass', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});

it('should pass 2', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});

it('should pass 3', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});

it('should pass 4', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});

it('should pass 5', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});

it('should pass 6', async function() {
    await this.browser.step(this.currentTest.id(), '1=1', () => {
        assert.equal(1, 1);
    });
});
