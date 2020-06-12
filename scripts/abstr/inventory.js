class Inventory {
    constructor(cols, rows) {
        this.items = [];
        for (let i = 0; i < rows; i++) {
            this.items[i] = [];
            for (let j = 0; j < cols; j++) this.items[i][j] = new Item();
        }
        this.wid = cols, this.hei = rows;
        this.hand = null;
    }

    draw(x, y, d, s=d*invSpacing) {
        push();

        noStroke();
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++) {
                fill(mouseHovering(x + i*s, y + j*s, d/2) ? 116 : 94);
                circle(x + i*s, y + j*s, d);
            }

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                this.items[j][i].draw(x + i*s, y + j*s, d);

        if (this.hand) this.hand.draw(mouseX,mouseY,d);

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseHovering(x + i*s, y + j*s, d/2)) this.items[j][i].tooltip();

        pop();
    }

    mouseEvent(x, y, d, s=d*invSpacing) {
        if (mouseButton == LEFT) {
            for (let i = 0; i < this.wid; i++)
                for (let j = 0; j < this.hei; j++)
                    if (mouseHovering(x + i*s, y + j*s, d/2)) {
                        if (!this.hand) {
                            if (this.items[j][i].props) {
                                this.hand = this.items[j][i];
                                this.items[j][i] = new Item();
                            }
                        } else {
                            const temp = this.items[j][i];
                            this.items[j][i] = this.hand;
                            this.hand = temp.props ? temp : null;
                        }
                        return;
                    }
        } else if (mouseButton == RIGHT) {
            if (!this.hand) {
                //todo: pick up round(half) the item
            }
        }
    }

    add(item) {
        if (item.props.quan)
            for (let j = 0; j < this.wid; j++)
                for (let i = 0; i < this.hei; i++)
                    if (this.items[i][j].matches(item)) {
                        const wannaPlace = stackSize - this.items[i][j].props.quan;
                        if (wannaPlace >= item.props.quan) { this.items[i][j].props.quan += item.props.quan; return true; }
                        this.items[i][j].props.quan = stackSize;
                        item.props.quan -= wannaPlace;
                    }

        for (let j = 0; j < this.wid; j++)
            for (let i = 0; i < this.hei; i++)
                if (!this.items[i][j].props) { this.items[i][j] = item; return true; }

        return false;
    }
}
