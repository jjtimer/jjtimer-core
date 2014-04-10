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
    assert.equal(1, S.length());
    var t = S.at(0);
    assert.equal(0, t.time);
    S.reset();
    assert.equal(0, S.length());
  })

  it('should calculate averages', function() {
    var S = Session();
    assert.equal(-1 /* DNF */, S.average());
    S.add({ time: 0 });
    assert.equal(-1 /* DNF */, S.average());
    S.add({ time: 0 });
    S.add({ time: 0 });
    assert.equal(0, S.average());
  })
})
