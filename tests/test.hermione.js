const {assert} = require('chai');

hermione.only.in(['chrome', 'chrome2']);
it('should pass', async function() {
    assert.equal(1, 1);
});
