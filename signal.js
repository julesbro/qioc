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
        if (sub.guid == undefined) {
            sub.guid = Guid.create();
        }
        this.subscribers[sub.guid.value] = {
            handler: handler.bind(sub),
            subref: sub
        };
    }

    // remove a subscriber from the signal
    unsubscribe(sub) {
        if (sub.guid == undefined) {
            throw (`Could not unsubscribe ${sub}`);
        }
        delete this.subscribers[sub.guid.value];
    }

    // fire a signal with an arbitrary number of arguments
    fire(...args) {
        for (var sub in this.subscribers) {
          var subscriber = this.subscribers[sub];
            subscriber.handler.apply(subscriber.subref, args);
        }
    }
}

module.exports = new Signal();
