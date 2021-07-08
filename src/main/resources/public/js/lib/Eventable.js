function getEventSubscribers(eventable, eventName, needCreate) {
    var registry = eventable._eventable_registry;

    if (eventName in registry) {
        return registry[eventName];

    } else if (needCreate) {
        return registry[eventName] = [];
    }

    return null;
}


export class Eventable {
    constructor() {
        this._eventable_registry = {};
    }

    on(eventName, handler, ctx) {
        var subscribers = getEventSubscribers(this, eventName, true);

        subscribers.push({
            handler: handler,
            ctx: ctx
        });

        return this;
    }

    off(eventName, handler, ctx) {
        var subscribers = getEventSubscribers(this, eventName);

        if (subscribers) {
            for (var i = subscribers.length; i-- ;) {
                if ((subscribers[i].handler === handler)
                    && (subscribers[i].ctx === ctx)
                ) {
                    subscribers.splice(i, 1);
                    return this;
                }
            }
        }

        return this;
    }

    trigger(eventName, data) {
        var subscribers = getEventSubscribers(this, eventName);

        if (subscribers) {
            var subscribersCopy = subscribers.slice();
            for (var i = 0, l = subscribersCopy.length; i !== l; i += 1) {
                subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
            }
        }

        return this;
    }
}