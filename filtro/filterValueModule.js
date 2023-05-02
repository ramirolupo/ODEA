class FilterValueModule extends Module {
	constructor(areaId) {
		super("filterValue", areaId);
	}
}

class FilterValueLogic extends Logic {
	constructor() {
		super(FilterValue);
	}

	oncreate(instance) {
		instance.create(this.View.getArea());
	}
}

class FilterValueView extends View {}
class FilterValueData extends Data {}

// Carga el módulo de filtros
(function () {
	try {
		const filter = new FilterValueModule("filterValue");
		filter.create();
	} catch (e) {
		console.log("No se pudo crear el filtro del tipo Value");
	}
})();
