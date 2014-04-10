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

  function at(index) {
    return solves[index];
  }

  function toggle_dnf(index) {}

  function toggle_plus2(index) {}

  function get_trim(size) {
    return Math.ceil(size / 20);
  }

  function solve_sort(a, b) {
    return a.time - b.time;
  }

  function average(start, length) {
    start = start || 0;
    length = length || solves.length;

    if (length < 3) return -1;

    var end = start + length;
    var trim = get_trim(length);

    var copy = solves.slice(start, end);
    copy.sort(solve_sort);
    copy.splice(0, trim);
    copy.splice(copy.length - trim, trim);

    var sum = 0;
    for (var i = 0; i < copy.length; ++i) {
      sum += copy[i].time;
    }
    return sum / (length - (2 * trim));
  }

  return {
    reset: reset,
    add: add,
    remove: remove,
    at: at,
    length: length,
    toggle_dnf: toggle_dnf,
    toggle_plus2: toggle_plus2,
    average: average
  };
});

if (typeof module !== 'undefined')
  module.exports = Session;
