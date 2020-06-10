class Item {
    constructor(props, nothing=false) {
        if (nothing) { this.isNull = true; return; }
        this.name = props.name;
        this.desc = props.desc;
        this.ench = props.ench;
        this.type = props.type;
        this.rare = props.rare;
        this.imag = props.imag;
        this.isNull = false;
        this.updateTip();
    }

    updateTip() {
        let enchStr = "";
        for (let ench of this.ench)
            enchStr += ench.type.split(" ").join("~") + "~" + ench.level + ", ";
        enchStr = enchStr.slice(0, -2);

        const tipText = [
            new TooltipText(this.name, colors.yellow, textSizes.name, false),
            new TooltipText('', colors.yellow, textSizes.space, false),
            new TooltipText(enchStr, colors.lightblue, textSizes.default, true),
            new TooltipText('', colors.yellow, textSizes.space, false),
            new TooltipText(this.desc, colors.white, textSizes.default, true),
            new TooltipText('', colors.yellow, textSizes.space, false),
            new TooltipText(this.rare + ' ' + this.type, colors.yellow, textSizes.default, false)
        ];

        this.ttip = [];
        for (let i of tipText)
            for (let j of i.separate(50).flat(Infinity)) this.ttip.push(j);

        this.twid = 0, this.thei = 0;
        for (let i of this.ttip) {
            this.twid = Math.max(this.twid, i.width());
            this.thei += i.height();
        }
    }

    draw(x, y, d) {
        push();
        fill(mouseHovering(x, y, d/2) ? 158 : 102);
        circle(x, y, d);
        if (!this.isNull) image(this.imag, x, y, 7*d/6, 7*d/6);
        pop();
    }

    tooltip() {
        if (this.isNull) return;
        push();

        const buff = 8, padd = 8, offs = 4;

        fill(colors.darkgray);
        rect(mouseX-buff+offs,mouseY-buff+offs,this.twid+padd*2+buff*2,this.thei+padd*2+buff*2);

        fill(colors.gray);
        rect(mouseX+offs,mouseY+offs,this.twid+padd*2,this.thei+padd*2);

        textAlign(LEFT, TOP);
        const xOff = mouseX + padd + offs;
        let yOff = mouseY - textSizes.name / 6 + padd + offs;
        for (let i of this.ttip) {
            i.draw(xOff, yOff);
            yOff += i.height();
        }

        pop();
    }
}
