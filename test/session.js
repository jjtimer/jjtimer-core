var assert = require('assert');

var Session = require('../src/session.js');

describe('Session', function() {
  it('should pass some basic sanity tests', function() {
    var S = Session();
    assert.equal(0, S.length());
    S.add({ time: 0 });
    assert.equal(1, S.length());
    S.add({ time: 0 });
    assert.equal(2, S.length());
    S.remove(1);
    assert(1, S.length());
    S.reset();
    assert.equal(0, S.length());
  })
})
