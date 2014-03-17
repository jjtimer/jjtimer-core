var Timer = (function(Util) {
  'use strict';

  // Internal constants for the various timer states.
  var Waiting = 0, Inspecting = 1, Ready = 2, Running = 3, Delay = 4;

  var state = Waiting;
  var startTime = undefined, endTime = undefined, solveTime = undefined;
  var intervalID = undefined;

  function isWaiting() { return state == Waiting; }
  function isReady() { return state == Ready; }
  function isRunning() { return state == Running; }

  function runningEmitter() {
    Event.emit("timer/running");
  }

  function trigger() {
    if (isWaiting()) {
      state = Ready;
    } else if (isReady()) {
      state = Running;
      startTime = Util.getMilli();
      intervalID = setInterval(runningEmitter, 100);
    } else if (isRunning()) {
      state = Waiting;
      endTime = Util.getMilli();
      clearInterval(intervalID);
    }
  }

  function getCurrent() {
    return Util.getMill() - startTime;
  }

  return {
    trigger: trigger,
    getCurrent: getCurrent
  };
});
