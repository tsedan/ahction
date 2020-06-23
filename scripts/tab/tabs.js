class Tabs {
    constructor(horizontal) {
        this.tabs = {};
        this.active = null;
        this.hor = horizontal;
        this.x = 0; this.y = 0;
        this.d = 1; this.s = 1;
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

    draw() {
        push();

        if (this.active) this.tabs[this.active].draw(this.x, this.y+this.d, this.d, this.s);

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign((this.hor == 1 ? LEFT : RIGHT), TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            const hovering = mouseInRect(this.x + (-this.d/2+offset)*this.hor, this.y-(correctSize/2), textWidth(keys[tab])*this.hor, correctSize/2);
            fill(this.active == keys[tab] ? state.colors.perfectwhite : (hovering ? state.colors.lightgray : state.colors.gray));
            text(keys[tab], this.x + (-this.d/2+offset)*this.hor, this.y-this.d/2);
            offset += textWidth(keys[tab] + ' ');
        }

        pop();
    }

    handleDouble() {
        if (this.active) this.tabs[this.active].handleDouble(this.x, this.y, this.d, this.s);
    }

    handleDrag() {
        if (this.active) this.tabs[this.active].handleDrag(this.x, this.y, this.d, this.s);
    }

    handlePress() {
        push();

        const correctSize = textSizes.default * state.scale/originalscale;
        textSize(correctSize);
        textAlign((this.hor == 1 ? LEFT : RIGHT), TOP);

        const keys = Object.keys(this.tabs); let offset = 0;
        for (let tab = 0; tab < keys.length; tab++) {
            if (mouseInRect(this.x + (-this.d/2+offset)*this.hor, this.y-(correctSize/2), textWidth(keys[tab])*this.hor, correctSize/2)) this.active = keys[tab];
            offset += textWidth(keys[tab] + ' ');
        }

        if (this.active) this.tabs[this.active].handlePress(this.x, this.y, this.d, this.s);

        pop();
    }

    update() {
        if (this.posfunct) this.posfunct();
        for (let tab of Object.values(this.tabs)) tab.update();
    }
}
