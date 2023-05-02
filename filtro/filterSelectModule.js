class FilterSelectModule extends Module {
	constructor(areaId) {
		super("filterSelect", areaId);
	}

	subscribeEvents() {
		EventsListener.subscribe("locations.ready", (locations) => {
			this.Logic.fillList(locations.getList());
		});
	}
}

class FilterSelectLogic extends Logic {
	constructor() {
		super(FilterSelect);
	}

	oncreate(instance) {
		instance.create(this.View.getArea());
	}

	fillList(list) {
		this.getInstance().fill(list, (item) => item.title);
	}
}

class FilterSelectView extends View {}
class FilterSelectData extends Data {}

// Carga el módulo de filtros del tipo Select
(function () {
	try {
		const filter = new FilterSelectModule("filterSelect");
		filter.create();
	} catch (e) {
		console.log("No se pudo crear el filtro del tipo select");
	}
})();
