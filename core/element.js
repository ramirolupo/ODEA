class Element {
	constructor(record) {
		this._record = record;
		this._instance = null;
	}

	record() {
		return this._record;
	}

	instance(instance) {
		if (instance != undefined) this._instance = instance;
		return this._instance;
	}

	show() {
		if (this._instance) this._instance.style.display = "block";
	}

	hide() {
		if (this._instance) this._instance.style.display = "none";
	}

	filterByValue(value) {
		return this._record.filterByValue(value);
	}

	getFacade() {
		return {
			instance: () => this.instance(),
			record: () => this.record(),
			show: () => {
				this.show();
			},
			hide: () => {
				this.hide();
			},
		};
	}

	create() {
		console.log("Falta definir el metodo create");
	}
}
