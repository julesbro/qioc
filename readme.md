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

# To run tests
## mocha test --watch
