// A simple container
// a container simply binds a key to a value
// and can contain any types of objects

class Container {

    // create an empty container
    constructor() {
        this.container = {};
    }

    // create a binding
    bind(name, value) {
        this.container[name] = value;
    }

    // get a bound item in the container
    get(name) {
        if (this.container[name] == undefined) {
            throw (`Container could not resolve ${name}`);
            return;
        }
        return this.container[name];
    }

    remove(name) {
      if (this.container[name] == undefined) {
          throw (`Container could not resolve ${name}`);
          return;
      }
      delete this.container[name];
    }
}

module.exports = new Container();
