class Mapa {
	constructor() {
		this._map = null;
	}

	getMap() {
		return this._map;
	}

	centerMap(position) {
		this._map.setCenter(position);
	}

	createMap(container, options) {
		this._map = new google.maps.Map(container, options);
		this._addEventBound();
	}

	_addEventBound() {
		google.maps.event.addListener(this._map, "bounds_changed", () => {
			EventsListener.trigger("filter.mapBounds", this.getFacade());
		});
	}

	createElement(attributes) {
		const marker = new MapaMarcador(attributes);
		marker.create(this._map);
		return marker;
	}

	getFacade() {
		return {
			getBounds: () => this._map.getBounds(),
			getFilter: () => new FilterConditionMapBounds(this._map.getBounds())
		}
	}
}

class MapaMarcador extends Element {
	create(map) {
		this._map = map;
		this.instance(
			new google.maps.Marker({
				position: this._record.position,
				title: this._record.title,
			})
		);
		this._addEventClick();
	}

	_addEventClick() {
		google.maps.event.addListener(this.instance(), "click", (event) => {
			EventsListener.trigger("marker.click", this.getFacade());
		});
	}

	show() {
		this.instance()?.setMap(this._map);
	}

	hide() {
		this.instance()?.setMap(null);
	}

	getFacade() {
		const out = super.getFacade();
		out.marker = () => this.instance();
		return out;
	}
}

class FilterConditionMapBounds extends FilterCondition {
    constructor(bounds) {
        super("mapBounds");
        this.setValue(bounds);
    }

    apply(item) {
    	return this.getValue().contains(item.record().position);
    }
}