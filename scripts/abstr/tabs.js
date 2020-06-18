class Tabs {
    constructor() {
        this.tabs = {};
    }

    add(tab, label) {
        this.tabs[label] = tab;
    }

    draw(x, y, d=state.scale, s=d*spacing) {
        for (let label of Object.keys(this.tabs)) {
            this.tabs[label].draw(x, y, d, s);
        }
    }
}
