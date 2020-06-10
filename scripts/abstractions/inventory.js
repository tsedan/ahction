class Inventory {
    constructor(wid, hei) {
        this.items = [];
            for (let i = 0; i < hei; i++) {
                this.items[i] = [];
                for (let j = 0; j < wid; j++) this.items[i][j] = new Item({}, true);
            }
        this.wid = wid, this.hei = hei;
    }

    draw(x, y, d, sx, sy) {
        push();

        noStroke();
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                this.items[j][i].draw(x + i*sx, y + j*sy, d);

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseHovering(x + i*sx, y + j*sy, d/2)) this.items[j][i].tooltip();
        pop();
    }

    add(item) {
        for (let i = 0; i < this.hei; i++)
            for (let j = 0; j < this.wid; j++)
                if (this.items[i][j].isNull) { this.items[i][j] = item; return true; }
        return false;
    }
}

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
        const tipText = [
            new TooltipText(this.name, colors.yellow, textSizes.name, false),
            new TooltipText('', colors.yellow, textSizes.space, false),
            new TooltipText(this.ench, colors.lightblue, textSizes.default, true),
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
        if (!this.isNull) image(this.imag, x, y, 5*d/4, 5*d/4);
        pop();
    }

    tooltip() {
        if (this.isNull) return;
        push();

        const buff = 8;
        const padd = 8;
        const offs = 4;

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
