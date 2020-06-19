class Item {
    constructor(props = { isNull: true }) {
        this.props = props;

        if (!this.props.isNull) {
            if (this.props.stac == undefined) this.props.stac = (this.props.quan ? true : false);
            this.props.quan = this.props.quan || 1;
            this.props.isNull = false;
        }

        this.backcolor = state.colors.gray;

        this.update();
    }

    update() {
        if (this.props.isNull) return;

        let enchStr = "";
        if (this.props.ench) for (let ench of this.props.ench)
            enchStr += ench.stringify() + ", ";
        enchStr = enchStr.slice(0, -2);

        let moveStr = "";
        if (this.props.move) for (let move of this.props.move)
            moveStr += move.stringify() + ", ";
        moveStr = moveStr.slice(0, -2);

        let tipText = [
            new TooltipText(this.props.name || 'null', state.colors[this.props.rare || 'common'], textSizes.name, false),
            new TooltipText('', state.colors.yellow, textSizes.space, false)
        ];

        if (moveStr) {
            tipText = tipText.concat([
                new TooltipText(moveStr, state.colors.lightred, textSizes.default, true),
                new TooltipText('', state.colors.yellow, textSizes.space, false)
            ]);
        }

        if (enchStr) {
            tipText = tipText.concat([
                new TooltipText(enchStr, state.colors.lightblue, textSizes.default, true),
                new TooltipText('', state.colors.yellow, textSizes.space, false)
            ]);
        }

        if (this.props.desc) {
            tipText = tipText.concat([
                new TooltipText(this.props.desc, state.colors.white, textSizes.default, true),
                new TooltipText('', state.colors.yellow, textSizes.space, false)
            ]);
        }

        if (this.props.type) {
            const bottomText = (this.props.rare ? this.props.rare + ' ' : '') + (this.props.suff ? this.props.suff + ' ' : '') + this.props.type;
            tipText.push(new TooltipText(bottomText, state.colors[this.props.rare || 'common'], textSizes.default, false));
        }

        this.ttip = [];
        for (let i of tipText)
            for (let j of i.separate(50).flat(Infinity)) this.ttip.push(j);

        this.twid = 0, this.thei = 0;
        for (let i of this.ttip) {
            this.twid = Math.max(this.twid, i.width());
            this.thei += i.height();
        }

        this.imag = state.images[this.props.imag] || state.images[this.props.type + '_' + this.props.suff] || state.images['null'];
    }

    draw(x, y, d=state.scale) {
        this.backcolor = lerpColor(this.backcolor, state.colors.gray, 0.2);

        if (this.props.isNull) return;

        push();

        image(this.imag, x, y, 7*d/6, 7*d/6);

        if (this.props.stac) {
            textSize(textSizes.default * state.scale/originalscale);
            fill(state.colors.white);
            textAlign(LEFT, BASELINE);
            text(this.props.quan, x-d/2, y+d/2);
        }

        pop();
    }

    matches(item) {
        if (this.props.isNull || item.props.isNull) return false;
        return (
            this.props.name == item.props.name &&
            this.props.desc == item.props.desc &&
            this.props.type == item.props.type &&
            this.props.rare == item.props.rare &&
            this.props.stac == item.props.stac &&
            this.props.imag == item.props.imag
        );
    }

    tooltip() {
        if (this.props.isNull) return;

        push();

        const dir = (mouseX < width/2 ? 1 : -1);
        const buff = state.scale/7, padd = state.scale/5, offs = state.scale/10;

        fill(state.colors.darkgray);
        rect(mouseX+offs-buff*dir,mouseY-buff+offs,(this.twid+padd*2+buff*2)*dir,this.thei+padd*2+buff*2);

        fill(state.colors.black);
        rect(mouseX+offs,mouseY+offs,(this.twid+padd*2)*dir,this.thei+padd*2);

        textAlign(LEFT, TOP);
        const xOff = mouseX + padd + offs - (dir == -1 ? (this.twid+padd*2) : 0);
        let yOff = mouseY - (textSizes.name * state.scale/originalscale)/6 + padd + offs;
        for (let tip of this.ttip) {
            tip.draw(xOff, yOff);
            yOff += tip.height();
        }

        pop();
    }

    copy() {
        return this.props.isNull ? new Item() : new Item(Object.assign({}, this.props));
    }
}
