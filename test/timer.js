var assert = require('assert');

var MockUtilObj = (function () {
  var currentMilli = 0;
  var intervalFn = null;
  return {
    incrementMilli: function() { return currentMilli += 1; },
    getMilli: function() { return currentMilli; },
    clearMilli: function() { currentMilli = 0; },
    setInterval: function(fn, ms) { intervalFn = fn; },
    clearInterval: function() {},
    fireInterval: function() { intervalFn(); }
  };
});

describe('Timer', function() {
  it('should start after a triggerDown, triggerUp', function() {
    var Event = require('../src/event.js');
    var MockUtil = MockUtilObj();
    var Timer = require('../src/timer.js')(Event, MockUtil);
    Event.on('timer/running', function() { MockUtil.incrementMilli(); });
    var startedEvent = false, stoppedEvent = false;
    Event.on('timer/started', function() { startedEvent = true; });
    Event.on('timer/stopped', function() { stoppedEvent = true; });

    assert.equal(false, startedEvent);
    Timer.triggerDown();
    Timer.triggerUp();
    assert.equal(true, startedEvent);
    assert.equal(0, Timer.getCurrent());
    MockUtil.fireInterval();
    assert.equal(1, Timer.getCurrent());
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    MockUtil.fireInterval();
    assert.equal(5, Timer.getCurrent());
    assert.equal(true, Timer.isRunning());
    assert.equal(false, stoppedEvent);
    Timer.triggerDown();
    Timer.triggerUp();
    assert.equal(5, Timer.getCurrent());
    assert.equal(true, stoppedEvent);
  })

  it('should time with several splits', function() {
    var Event = require('../src/event.js');
    var MockUtil = MockUtilObj();
    var Timer = require('../src/timer.js')(Event, MockUtil);
    Event.on('timer/running', function() { MockUtil.incrementMilli(); });
    Timer.setSplits(2);
    for(var i = 0; i < 2; ++i) {
      Timer.triggerDown();
      Timer.triggerUp();
      MockUtil.fireInterval();
      assert.equal(true, Timer.isRunning());
      Timer.triggerDown();
      Timer.triggerUp();
      assert.equal(true, Timer.isRunning());
      MockUtil.fireInterval();
      MockUtil.fireInterval();
      Timer.triggerDown();
      Timer.triggerUp();
      assert.equal(true, Timer.isRunning());
      MockUtil.fireInterval();
      Timer.triggerDown();
      Timer.triggerUp();
      assert.equal(false, Timer.isRunning());
      var splits = Timer.getSplits();
      assert.deepEqual([1, 3], splits);
      MockUtil.clearMilli();
    }
  })
})
