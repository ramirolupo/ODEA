class FilterSelect {
    constructor() {
        this._select = null;
    }

    create(container) {
        this._select = document.createElement("select");
        this._select.className = "filter-select";

        container.className = "filter-container";
        container.appendChild(this._select);

        this._addEventClick();
    }

    _addEventClick() {
        this._select.onchange = () => { 
            EventsListener.trigger("filter.select", this.getFacade());
        }
    }

    fill(list, fnRender = (item) => item) {
        let html = '<option value="">Seleccionar</option>';
        list.forEach(item => html += `<option>${ fnRender(item) }</option>`);
        this.getSelect().innerHTML = html;
    }

    getSelect() {
        return this._select;
    }

    getFacade() {
		return {
			getFilter: () => new FilterConditionSelect(this._select.value) 
		}
	};
}

class FilterConditionSelect extends FilterCondition {
    constructor(value) {
        super("filerSelect");
        this.setValue(value);
    }

    isActive() {
        return (this.getValue() !== "");
    }

    apply(item) {
        return item.filterByValue(this.getValue());
    }
}