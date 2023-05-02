class FilterCondition {
	constructor(id) {
		this.id = id;
		this._value = null;
	}

	isActive() {
		return (this._value !== null);
	}

	getValue(value) {
		return this._value;
	}

	setValue(value) {
		this._value = value;
	}

	apply() { return true; }
}