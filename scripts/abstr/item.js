class Item {
    constructor(props) {
        this.props = props;
        this.update();
    }

    update() {
        if (!this.props) return;

        let enchStr = "";
        if (this.props.ench) for (let ench of this.props.ench)
            enchStr += ench.stringify() + ", ";
        enchStr = enchStr.slice(0, -2);

        let tipText = [
            new TooltipText(this.props.name || 'null', rareToColor[this.props.rare || 'common'], textSizes.name, false),
            new TooltipText('', colors.yellow, textSizes.space, false)
        ];

        if (enchStr) {
            tipText = tipText.concat([
                new TooltipText(enchStr, colors.lightblue, textSizes.default, true),
                new TooltipText('', colors.yellow, textSizes.space, false)
            ]);
        }

        if (this.props.desc) {
            tipText = tipText.concat([
                new TooltipText(this.props.desc, colors.white, textSizes.default, true),
                new TooltipText('', colors.yellow, textSizes.space, false)
            ]);
        }

        if (this.props.type) {
            const bottomText = (this.props.rare ? this.props.rare + ' ' : '') + (this.props.suff ? this.props.suff + ' ' : '') + this.props.type;
            tipText.push(new TooltipText(bottomText, rareToColor[this.props.rare || 'common'], textSizes.default, false));
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

    draw(x, y, d) {
        if (!this.props) return;

        push();

        image(this.imag, x, y, 7*d/6, 7*d/6);

        if (this.props.quan) {
            textSize(textSizes.default);
            fill(colors.white);
            textAlign(LEFT, BASELINE);
            text(this.props.quan, x-d/2, y+d/2);
        }

        pop();
    }

    matches(item) {
        if (!this.props || !item.props) return false;
        return (
            this.props.name == item.props.name &&
            this.props.desc == item.props.desc &&
            this.props.type == item.props.type &&
            this.props.rare == item.props.rare &&
            this.props.imag == item.props.imag
        );
    }

    tooltip() {
        if (!this.props) return;

        push();

        const buff = 6, padd = 8, offs = 4;

        fill(colors.darkgray);
        rect(mouseX-buff+offs,mouseY-buff+offs,this.twid+padd*2+buff*2,this.thei+padd*2+buff*2);

        fill(colors.gray);
        rect(mouseX+offs,mouseY+offs,this.twid+padd*2,this.thei+padd*2);

        textAlign(LEFT, TOP);
        const xOff = mouseX + padd + offs;
        let yOff = mouseY - textSizes.name / 6 + padd + offs;
        for (let tip of this.ttip) {
            tip.draw(xOff, yOff);
            yOff += tip.height();
        }

        pop();
    }

    copy() {
        return this.props ? new Item(Object.assign({}, this.props)) : new Item();
    }
}
