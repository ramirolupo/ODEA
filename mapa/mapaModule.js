class MapaModule extends Module {
	constructor(areaId) {
		super("mapa", areaId);
	}

	subscribeEvents() {
		EventsListener.subscribe("locations.ready", (locations) => {
			this.Logic.createElements(locations);
			this.View.showElements();
		});

		EventsListener.subscribe("filter.select", (facade) => {
			this.Data.setFilter(facade.getFilter());
			this.View.refreshElements();
		});

		EventsListener.subscribe("filter.inputValue", (facade) => {
			this.Data.setFilter(facade.getFilter());
			this.View.refreshElements();
		});

		EventsListener.subscribe("panelLine.click", (location) =>
			this.View.centerMap(
				this.Logic.getInstance(),
				location.record().position
			)
		);
	}
}

class MapaLogic extends Logic {
	constructor() {
		super(Mapa);
	}

	oncreate(instance) {
		instance.createMap(this.View.getArea(), {
			zoom: 14,
			center: { lat: -33.860664, lng: 151.208138 },
		});
	}
}

class MapaView extends View {
	constructor() {
		super(Mapa);
	}

	centerMap(instance, position) {
		instance.centerMap(position);
	}
}

class MapaData extends Data {}
