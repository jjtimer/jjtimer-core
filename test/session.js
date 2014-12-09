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
    S.add({ time: 0 });
    S.remove();
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
    assert.equal(0, S.average().avg);
  })

  it('should calculate min/max of an average', function() {
    var S = Session();
    S.add({ time: 2 });
    S.add({ time: 1 });
    S.add({ time: 3 });
    var avg = S.average();
    assert.equal(2, avg.avg);
    assert.equal(1, avg.min);
    assert.equal(2, avg.max);
  })

  it('should be able to +2 and DNF times', function() {
    var S = Session();
    S.add({ time: 1 });
    assert.equal(false, !!S.at(0)['DNF']);
    S.toggle_dnf(0);
    assert.equal(true, S.at(0)['DNF']);
    S.toggle_dnf(0);
    assert.equal(false, S.at(0)['DNF']);
  })
})
