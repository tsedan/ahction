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
