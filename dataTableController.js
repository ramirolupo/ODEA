class DataRecord {
	constructor(attributes) {
		this._attributes = attributes;
		this.id = attributes.id || DataTable.Id++;
		this._fieldToFilter = null;
	}

	get title() {
		return this._attributes.name;
	}

	get position() {
		return { lat: this._attributes.lat, lng: this._attributes.lng };
	}

	lat(lat) {
		if (lat != null) this._attributes.lat = lat;
		return this._attributes.lat;
	}

	lng(lng) {
		if (lng != null) this._attributes.lng = lng;
		return this._attributes.lng;
	}

	filterByValue(value) {
		this._fieldToFilter ||= (this.title || "").toLowerCase().trim();
		return this._fieldToFilter.includes(value.toLowerCase());
	}
}

class DataTable {
	static Id = 0;

	constructor() {
		this._list = [];
	}

	load(list) {
		list.forEach((item) => this.add(item));
	}

	add(item) {
		this._list.push(item);
	}

	getList() {
		return this._list;
	}

	static defaults = {
		add: () => null,
		getList: () => [],
	};
}

class DataTableController {
	constructor() {
		this._data = {};
	}

	add(id, data) {
		this._data[id] = data;
		EventsListener.trigger(id + ".ready", data);
	}

	get(id) {
		return this._data[id] || DataTable.defaults;
	}
}

window.DataTableManager = new DataTableController();
