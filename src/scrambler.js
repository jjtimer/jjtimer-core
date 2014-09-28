var Scrambler = (function() {
  var list = [];

  function register(scrambler) {
    list.push(scrambler);
  }

  function get(index) {
    return list[index];
  }

  function length() {
    return list.length;
  }

  return {
    register: register,
    get: get,
    length: length
  };
});

if (typeof module !== 'undefined')
  module.exports = Scrambler;
