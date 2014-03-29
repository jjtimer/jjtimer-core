var Session = (function() {
  'use strict';

  var solves = [];

  function reset() {
    solves = [];
  }

  function add(solve) {
    solves.push(solve);
  }

  function length() {
    return solves.length;
  }

  function remove(index) {
    solves.splice(index, 1);
  }

  function toggle_dnf(index) {}

  function toggle_plus2(index) {}

  function average(start, length) {}

  return {
    reset: reset,
    add: add,
    remove: remove,
    length: length,
    toggle_dnf: toggle_dnf,
    toggle_plus2: toggle_plus2,
    average: average
  };
});

if (typeof module !== 'undefined')
  module.exports = Session;
