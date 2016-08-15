var Guid = require('guid');

// A signal
// Signals are multicast delegates that can be fired
// A fired signal will call each subscriber with the provided arguments
// The order in which subscribers are called is undefined
class Signal {
    constructor() {
        // create an empty container
        this.subscribers = {};
    }

    // add a subscriber to a signal
    subscribe(sub, handler) {
        this.subscribers[this.GetOrCreateKey(sub, handler)] = {
            handler: handler.bind(sub),
            subref: sub
        };
    }

    // remove a subscriber from the signal
    unsubscribe(sub, handler) {
        if (sub.guid == undefined) {
            throw (`Could not unsubscribe ${sub}`);
        }
        delete this.subscribers[this.GetKey(sub, handler)];
    }

    // fire a signal with an arbitrary number of arguments
    fire(...args) {
        for (var sub in this.subscribers) {
          var subscriber = this.subscribers[sub];
            subscriber.handler.apply(subscriber.subref, args);
        }
    }

    GetOrCreateKey(sub, handler) {
      if (sub.guid == undefined) {
          sub.guid = Guid.create();
      }
      return this.GetKey(sub, handler);
    }

    GetKey(sub, handler) {
      return sub.guid.value+handler.name;
    }
}

module.exports = Signal;
