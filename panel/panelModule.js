class PanelModule extends Module {
	constructor(areaId) {
		super("panel", areaId);
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

		EventsListener.subscribe("filter.mapBounds", (facade) => {
			this.Data.setFilter(facade.getFilter());
			this.View.refreshElements();
		});
	}
}

class PanelLogic extends Logic {
	constructor() {
		super(Panel);
	}

	oncreate(instance) {
		instance.create(this.View.getArea());
	}
}

class PanelView extends View {}

class PanelData extends Data {}

//Carga el modulo de panel
(function () {
	try {
		const panel = new PanelModule("panel");
		panel.create();
	} catch (e) {
		console.log("No se pudo crear el panel");
	}
})();
