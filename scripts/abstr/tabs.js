class Tabs {
    constructor() {
        this.tabs = {};
        this.active = null;
    }

    add(tab) {
        this.tabs[tab.label] = tab;
        if (this.active == null) this.active = tab.label;
    }

    draw(x, y, d=state.scale, s=d*spacing) {
        //todo: draw the tabs themselves

        if (this.active) this.tabs[this.active].draw(x, y, d, s);
    }

    handleDouble(x, y, d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDouble(x, y, d, s);
    }

    handleDrag(x, y, d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDrag(x, y, d, s);
    }

    handlePress(x, y, d=state.scale, s=d*spacing) {
        //todo: handle changing tabs

        if (this.active) this.tabs[this.active].handlePress(x, y, d, s);
    }
}
