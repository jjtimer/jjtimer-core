var assert = require('assert');

var MockUtil = (function () {
  var currentMilli = 0;
  var intervalFn = null;
  return {
    incrementMilli: function() { return currentMilli += 1; },
    getMilli: function() { return currentMilli; },
    setInterval: function(fn, ms) { intervalFn = fn; },
    clearInterval: function() {},
    fireInterval: function() { intervalFn(); }
  };
})();

var Event = require('../src/event.js');
var Timer = require('../src/timer.js')(Event, MockUtil);

describe('Timer', function() {
  it('should start after a triggerDown, triggerUp', function() {
    Event.on('timer/running', function() { MockUtil.incrementMilli(); });
    var stoppedEvent = false;
    Event.on('timer/stopped', function() { stoppedEvent = true; });

    Timer.triggerDown();
    Timer.triggerUp();
    assert.equal(0, Timer.getCurrent());
    MockUtil.fireInterval();
    assert.equal(1, Timer.getCurrent());
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    assert.equal(5, Timer.getCurrent());
    assert.equal(false, stoppedEvent);
    Timer.triggerDown();
    Timer.triggerUp();
    assert.equal(5, Timer.getCurrent());
    assert.equal(true, stoppedEvent);
  })
})
