var Scrambler = (function() {
  var list = [];

  function register(scrambler) {
    list.push(scrambler);
  }

  function get(index) {
    return list[index];
  }

  return {
    register: register,
    get: get
  };
});

if (typeof module !== 'undefined')
  module.exports = Scrambler;
