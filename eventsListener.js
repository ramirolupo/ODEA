class EventsController {
	constructor() {
		this._subscriptions = {}
		this._triggers = {}
	}

	subscribe(id, fnApply, attributes) {
		const subscription = new EventsSubscription(id, fnApply, attributes);

		this._subscriptions[id] ||= [];
		this._subscriptions[id].push(subscription);

		if (subscription.retroactive) this._trigger(subscription);
	}

	trigger(id, parameters) {
		this._triggers[id] = parameters;

		if (id in this._subscriptions) {
			this._subscriptions[id].forEach(subscription => subscription.apply(parameters));
		}
	}

	_trigger(subscription) {
		if (subscription.id in this._triggers) {
			subscription.apply(this._triggers[subscription.id]);
		}
	}
}

class EventsSubscription {
	constructor(id, fnApply, attributes = {}) {
		this.id = id;
		this._apply = fnApply;
		this._attributes = attributes;
		this._attributes.retroactive = (attributes.retroactive !== false);
	}

	get retroactive() {
		return this._attributes.retroactive;
	}

	apply(parameters) {
		this._apply(parameters);
	} 
}

window.EventsListener = new EventsController();