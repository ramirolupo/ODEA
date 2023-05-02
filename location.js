class Location extends DataRecord {}

class Locations extends DataTable {
    add(item) {
        super.add(new Location(item));
    }
}

//Carga las locaciones en el DataTableController
(function() {
    try {
        const locations = new Locations();
        locations.load(DATA_LOCATIONS);
        DataTableManager.add("locations", locations);
    }
    catch(e) {
        console.log("No se pudo cargar las locaciones");
    }
})();