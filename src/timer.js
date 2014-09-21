var Timer = (function(Event, Util) {
  'use strict';

  // Internal constants for the various timer states.
  var Waiting = 0, Inspecting = 1, Ready = 2, Running = 3, Stopped = 4;

  var state = Waiting;
  var startTime, endTime;
  var numSplits = 0, curSplit = 0, splitTimes = [];
  var intervalID;

  function reset() {
    setState(Waiting);
    if (intervalID)
      Util.clearInterval(intervalID);
  }

  function setSplits(num) {
    numSplits = num;
  }

  function getSplits() {
    return splitTimes;
  }

  function isWaiting() { return state === Waiting; }
  function isReady() { return state === Ready; }
  function isRunning() { return state === Running; }

  function onWaiting() {
    state = Waiting;
    curSplit = 0;
    endTime = undefined;
  }

  function onRunning() {
    startTime = Util.getMilli();
    state = Running;
    intervalID = Util.setInterval(runningEmitter, 10);
    Event.emit('timer/started');
    splitTimes = [];
  }

  function onStopped() {
    if (curSplit < numSplits) {
      splitTimes.push(Util.getMilli());
      curSplit += 1;
      return;
    }
    endTime = Util.getMilli();
    Util.clearInterval(intervalID);
    state = Stopped;
    Event.emit('timer/stopped');
    setState(Waiting);
  }

  function setState(new_state) {
    switch(new_state) {
    case Ready: state = Ready; break;
    case Waiting: onWaiting(); break;
    case Running: onRunning(); break;
    case Stopped: onStopped(); break;
    }
  }

  function runningEmitter() {
    Event.emit('timer/running');
  }

  function triggerDown() {
    if (isWaiting()) {
      setState(Ready);
    } else if (isRunning()) {
      setState(Stopped);
    }
  }

  function triggerUp() {
    if (isReady()) {
      setState(Running);
    }
  }

  function getCurrent() {
    return (endTime || Util.getMilli()) - startTime;
  }

  return {
    reset: reset,
    triggerDown: triggerDown,
    triggerUp: triggerUp,
    getCurrent: getCurrent,
    isRunning: isRunning,
    setSplits: setSplits,
    getSplits: getSplits
  };
});

if (typeof module !== 'undefined')
  module.exports = Timer;
