var Session = (function() {
  'use strict';

  function reset() {}

  function add(solve) {}

  function remove(index) {}

  function toggle_dnf(index) {}

  function toggle_plus2(index) {}

  function average(start, length) {}

  return {
    reset: reset,
    add: add,
    remove: remove,
    toggle_dnf: toggle_dnf,
    toggle_plus2: toggle_plus2,
    average: average
  };
});

if (typeof module !== 'undefined')
  module.exports = Session();
