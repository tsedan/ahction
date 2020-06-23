class Tabs {
    constructor(horizontal) {
        this.tabs = {};
        this.active = null;
        this.hor = horizontal;
        this.x = 0; this.y = 0;
    }

    initpos(posfunct) {
        this.posfunct = posfunct;
        this.posfunct();
    }

    add(tab) {
        this.tabs[tab.label] = tab;
        tab.hor = this.hor;
        this.active = tab.label;
    }

    draw(d=state.scale, s=d*spacing) {
        push();

        if (this.active) this.tabs[this.active].draw(this.x, this.y+d, d, s);

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign((this.hor == 1 ? LEFT : RIGHT), TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            const hovering = mouseInRect(this.x + (-d/2+offset)*this.hor, this.y-(correctSize/2), textWidth(keys[tab])*this.hor, correctSize/2);
            fill(this.active == keys[tab] ? state.colors.perfectwhite : (hovering ? state.colors.lightgray : state.colors.gray));
            text(keys[tab], this.x + (-d/2+offset)*this.hor, this.y-d/2);
            offset += textWidth(keys[tab] + ' ');
        }

        pop();
    }

    handleDouble(d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDouble(this.x, this.y, d, s);
    }

    handleDrag(d=state.scale, s=d*spacing) {
        if (this.active) this.tabs[this.active].handleDrag(this.x, this.y, d, s);
    }

    handlePress(d=state.scale, s=d*spacing) {
        push();

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign((this.hor == 1 ? LEFT : RIGHT), TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            if (mouseInRect(this.x + (-d/2+offset)*this.hor, this.y-(correctSize/2), textWidth(keys[tab])*this.hor, correctSize/2)) this.active = keys[tab];
            offset += textWidth(keys[tab] + ' ');
        }

        if (this.active) this.tabs[this.active].handlePress(this.x, this.y, d, s);

        pop();
    }

    update() {
        if (this.posfunct) this.posfunct();

        for (let tab of Object.values(this.tabs)) tab.update();
    }
}
