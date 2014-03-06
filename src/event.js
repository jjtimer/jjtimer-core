var Event = (function() {
  'use strict';

  var events = [];

  function on(event, fn) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(fn);
  }

  function emit(event, args) {
    var fns = events[event];
    if (!fns)
      return;

    fns.forEach(function(fn, idx, arry) {
      fn(args);
    });
  }

  return {
    on: on,
    emit: emit
  };
});
