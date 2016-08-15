var chai = require('chai');
var expect = chai.expect;

var QIOC = require('./index.js');

describe('Container', function(){

  // create a container
  it('Container() should return a new container', function() {
    var Container = QIOC.Container();
    expect(Container == undefined).to.equal(false);
  });

  it('Container.bind should bind a key and value', function() {
    var Container = QIOC.Container();
    Container.bind('this', 'that');
    expect(Object.keys(Container.container).length).to.equal(1);
  });

  it('Container.get should get the value attached to a key', function() {
    var Container = QIOC.Container();
    Container.bind('this', 'that');
    expect(Container.get('this')).to.equal('that');
  });

  it('Container.remove should remove the value attached to a key', function() {
    var Container = QIOC.Container();
    Container.bind('this', 'that');
    Container.remove('this');
    expect(Object.keys(Container.container).length).to.equal(0);
  });

  it('Container() should return unique containers', function() {
    var Container = QIOC.Container();
    var Container2 = QIOC.Container();
    Container.bind('this', 'that');
    expect(Object.keys(Container2.container).length).to.equal(0);
  });

});

describe('Signal', function(){

  // create a new signal
  it('Signal() should return a new signal', function() {
    var Signal = QIOC.Signal();
    expect(Signal == undefined).to.equal(false);
  });

  var myTarget = {
    handler: function(value){
      // do something we can test later
      this.x = value;
    },
    handlerMultiArgument : function (val1, val2, val3) {
      this.u = val1;
      this.v = val2;
      this.w = val3;
    }
  }

  it('Signal.subscribe() should add a subscriber', function() {
    var Signal = QIOC.Signal();
    Signal.subscribe(myTarget, myTarget.handler);
    expect(Object.keys(Signal.subscribers).length).to.equal(1);
  });

  it('Signal.unsubscribe() should remove a subscriber', function() {
    var Signal = QIOC.Signal();
    Signal.subscribe(myTarget, myTarget.handler);
    Signal.unsubscribe(myTarget);
    expect(Object.keys(Signal.subscribers).length).to.equal(0);
  });

  it('Signal.fire() should fire the signal with the provided argument', function() {
    var Signal = QIOC.Signal();
    Signal.subscribe(myTarget, myTarget.handler);
    Signal.fire(5);
    expect(myTarget.x).to.equal(5);
  });

  it('Signal.fire() should fire the signal with the provided arguments applied', function() {
    var Signal = QIOC.Signal();
    Signal.subscribe(myTarget, myTarget.handlerMultiArgument);
    Signal.fire(1,2,3);
    expect(myTarget.u).to.equal(1);
    expect(myTarget.v).to.equal(2);
    expect(myTarget.w).to.equal(3);
  });
});
