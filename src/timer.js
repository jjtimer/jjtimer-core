var Timer = (function(Util) {
  'use strict';

  // Internal constants for the various timer states.
  var Waiting = 0, Inspecting = 1, Ready = 2, Running = 3, Stopped = 4;

  var state = Waiting;
  var startTime = undefined, endTime = undefined, solveTime = undefined;
  var intervalID = undefined;

  function isWaiting() { return state === Waiting; }
  function isReady() { return state === Ready; }
  function isRunning() { return state === Running; }

  function onRunning() {
    startTime = Util.getMilli();
    intervalID = Util.setInterval(runningEmitter, 100);
  }

  function onStopped() {
    endTime = Util.getMilli();
    Util.clearInterval(intervalID);
    setState(Waiting);
  }

  function setState(new_state) {
    state = new_state;
    switch(state) {
    case Running: onRunning(); break;
    case Stopped: onStopped(); break;
    }
  }

  function runningEmitter() {
    Event.emit("timer/running");
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
    return Util.getMilli() - startTime;
  }

  return {
    triggerDown: triggerDown,
    triggerUp: triggerUp,
    getCurrent: getCurrent
  };
});