var Timer = (function(Util) {
  'use strict';

  // Internal constants for the various timer states.
  var Waiting = 0, Inspecting = 1, Ready = 2, Running = 3, Delay = 4;

  var state = Waiting;
  var startTime = undefined, endTime = undefined, solveTime = undefined;
  var intervalID = undefined;

  function isWaiting() { return state === Waiting; }
  function isReady() { return state === Ready; }
  function isRunning() { return state === Running; }

  function onWaiting() {
    endTime = Util.getMilli();
    Util.clearInterval(intervalID);
  }

  function onRunning() {
    startTime = Util.getMilli();
    intervalID = Util.setInterval(runningEmitter, 100);
  }

  function setState(new_state) {
    state = new_state;
    switch(state) {
    case Waiting: onWaiting(); break;
    case Running: onRunning(); break;
    }
  }

  function runningEmitter() {
    Event.emit("timer/running");
  }

  function trigger() {
    if (isWaiting()) {
      setState(Ready);
    } else if (isReady()) {
      setState(Running);
    } else if (isRunning()) {
      setState(Waiting);
    }
  }

  function getCurrent() {
    return Util.getMilli() - startTime;
  }

  return {
    trigger: trigger,
    getCurrent: getCurrent
  };
});
