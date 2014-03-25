var assert = require('assert');

var Event = require('../src/event.js');

describe('Event', function() {
  it('should call all registered listeners', function() {
    var count = 0;
    var counter = function() { count += 1; };

    Event.on("count", counter);
    Event.emit("count");
    assert.equal(1, count);

    Event.on("count", counter);
    Event.emit("count");
    assert.equal(3, count);
  });
});
