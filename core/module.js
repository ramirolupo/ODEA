class Module {
	constructor(name, areaId) {
		this.name = name;
		this._areaId = areaId;
		this.linkChild("Logic");
		this.linkChild("View");
		this.linkChild("Data");
	}

	linkChild(type) {
		const name = this.name.charAt(0).toUpperCase() + this.name.substring(1);
		try {
			this[type] = eval(`new ${name + type}()`);
			this[type].Parent = this;
		}
		catch (e) {
			console.log(
				`Advertencia: la clase "${type}" de "${name}" no pudo ser creada`
			);
		}
	}

	create() {
		this.Logic.create(() => {
			this.subscribeEvents();
			EventsListener.trigger(this.name + ".ready", this.getFacade());
		});
	}

	_createElements(items) {
		this.Logic.createElements(items);
	}

	_createElement(attributes) {
		this.Logic.createElement(attributes);
	}

	_showElements() {
		this.View.showElements();
	}

	_hideElements() {
		this.View.hideElements();
	}

	getFacade() {
		return {
			createElements: (items) => this._createElements(items),
			createElement: (attributes) => this._createElement(attributes),
			showElements: () => this._showElements(),
			hideElements: () => this._hideElements(),
		};
	}

	subscribeEvents() {
		/* se sobreescribe */
	}
}

class Logic {
	constructor(classInstance) {
		this.Parent = null;
		this._instance = null;
		this._classInstance = classInstance;
	}

	get View() {
		return this.Parent.View;
	}

	get Data() {
		return this.Parent.Data;
	}

	create(fnCallback) {
		const area = this.View.getArea();
		if (area) {
			this._build(area, fnCallback);
		}
		else {
			setTimeout(() => this.create(fnCallback), 100);
		}
	}

	_build(area, fnCallback) {
		this._instance = new this._classInstance(area);
		this.oncreate(this._instance);
		fnCallback();
	}

	createElements(items) {
		items.getList().forEach((item) => this.createElement(item));
		EventsListener.trigger(this.name + "-elements.created");
	}

	createElement(attributes) {
		this.Data.addItem(attributes);
		const element = this._instance.createElement(attributes);
		this.Data.addElement(element);
		return element;
	}

	getInstance() {
		return this._instance;
	}

	build() {
		/* se sobreescribe */
	}
}

class View {
	constructor(parent) {
		this.Parent = parent;
	}

	get Logic() {
		return this.Parent.Logic;
	}

	get Data() {
		return this.Parent.Data;
	}

	getArea() {
		return document.getElementById(this.Parent._areaId);
	}

	showElements() {
		this.Data.getElements(true).forEach((element) => element.show());
		EventsListener.trigger(this.name + "-elements.show");
	}

	hideElements() {
		this.Data.getElements().forEach((element) => element.hide());
		EventsListener.trigger(this.name + "-elements.hide");
	}

	refreshElements() {
		this.hideElements();
		this.showElements();
	}
}

class Data {
	constructor(parent) {
		this.Parent = parent;
		this._elements = [];
		this._items = [];
		this._filters = {};
	}

	get View() {
		return this.Parent.View;
	}

	get Logic() {
		return this.Parent.Logic;
	}

	addItem(item) {
		this._items.push(item);
	}

	getItems() {
		return this._items;
	}

	addElement(element) {
		this._elements.push(element);
	}

	getElements(applyFilter = false) {
		return (
			applyFilter ?
			this._getElementsFiltered() :
			this._elements
		);
	}

	_getElementsFiltered() {
		return this._elements.filter((item) => this._applyFilters(item));
	}

	setFilter(filter) {
		if (filter.isActive()) {
			this._filters[filter.id] = filter;
		}
		else {
			delete this._filters[filter.id];
		}
	}

	_applyFilters(item) {
		for (let id in this._filters) {
			if (!this._filters[id].apply(item)) return false;
		}
		return true;
	}
}
