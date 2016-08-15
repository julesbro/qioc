var Signal = require('./signal.js');
var Container = require('./container.js');

module.exports.Container = function() {
  return  new Container();
}

module.exports.Signal = function () {
  return new Signal();
}
