This is a simple, light weight Ioc library

Install with:

    npm install qioc

## Container Usage Example

```js
var QIOC = require('qioc');;

// create a container
var myContainer = QIOC.Container();

// add a service to a container
myContainer.bind('this','that');

// retrieve a service from a container
var service = myContainer.get('this');

// remove a service from a container
myContainer.remove('this');

```

## Signal Usage Example
```js
var QIOC = require('qioc');;

// create a signal
var mySignal = QIOC.Signal();

// create a receiver object
var myTarget = {
  handler: function(value){
    // do something
    this.x = value;
  }
}
// subscribe the target to the signal
// first argument will be bound to 'this' during calls
// second argument is the handler function
mySingle.subscribe(myTarget, myTarget.handler);

// fire the signal with some data
// can also fire signals with arbitrary number of arguments
/// mySignal.fire(1,2,myVar...)
mySignal.fire(42);

// unsubscribe to a signal
mySignal.unsubscribe(myTarget);
```

# To run tests
```js
mocha test --watch
```
