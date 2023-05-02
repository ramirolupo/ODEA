class FilterValue {
    constructor() {
        this._input = null;
        this._button = null;
    }

    create(container) {
        this._input = document.createElement("input");
        this._input.className = "filter-input";

        this._button = document.createElement("div");
        this._button.className = "filter-button";
        this._button.innerHTML = '&#128269;&#65038;';

        container.className = "filter-container";
        container.appendChild(this._input);
        container.appendChild(this._button);

        this._addEventClick();
    }

    _addEventClick() {
        this._button.addEventListener(
            'click', 
            () => {
                EventsListener.trigger("filter.inputValue", this.getFacade());
            }
        );
    }

    getFacade() {
		return {
            getValue: () => this._input.value,
			getFilter: () => new FilterConditionValue(this._input.value) 
		}
	};
}

class FilterConditionValue extends FilterCondition {
    constructor(value) {
        super("filerValue");
        this.setValue(value);
    }

    isActive() {
        return (this.getValue() !== "");
    }

    apply(item) {
        return item.filterByValue(this.getValue());
    }
}