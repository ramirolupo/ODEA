class Panel {
    constructor() {
        this._ul = null;
    }

    create(container) {
        this._ul = document.createElement("ul");
        this._ul.id = container.id + ":List";
        container.appendChild(this._ul);
    }

    createElement(attributes) {
        const li = new PanelRecord(attributes);
        li.create(this._ul);
        return li;
    }
}

class PanelRecord extends Element {
    create(ul) {
        this._ul = ul;
        const instance = document.createElement("li");
        instance.style.display = "none";
        instance.innerHTML = this.record().title;
        this._ul.appendChild(instance);
        this._addEventClick(instance);

        return this.instance(instance);
    }

    _addEventClick(instance) {
        instance.addEventListener(
            'click', 
            () => {
                EventsListener.trigger("panelLine.click", this.getFacade());
            }
        );
    }

    getFacade() {
        const out = super.getFacade();
        out.line = () => this.instance();
        return out;
    }
}