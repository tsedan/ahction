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

        const [hovX, hovY] = this.hoverLoc(x, y, d, s);

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++) {
                fill(i == hovX && j == hovY ? 126 : 94);
                circle(x + i*s, y + j*s, d);
            }

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                this.items[j][i].draw(x + i*s, y + j*s, d);

        if (this.hand) this.hand.draw(mouseX,mouseY,d);
        if (hovX != null && hovY != null) this.items[hovY][hovX].tooltip();

        pop();
    }

    hoverLoc(x, y, d, s=d*invSpacing) {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseHovering(x + i*s, y + j*s, d/2)) { return [i, j]; }
        return [null, null];
    }

    mouseEvent(x, y, d, s=d*invSpacing) {
        const [i, j] = this.hoverLoc(x, y, d, s);
        if (i == null || j == null) return;

        if (mouseButton == LEFT) {
            if (!this.hand) {
                if (this.items[j][i].props) {
                    this.hand = this.items[j][i];
                    this.items[j][i] = new Item();
                }
            } else {
                if (this.items[j][i].matches(this.hand) && (this.items[j][i].props.quan && this.hand.props.quan)) {
                    const wannaPlace = stackSize - this.items[j][i].props.quan;
                    this.items[j][i].props.quan += min(this.hand.props.quan, wannaPlace);
                    (wannaPlace >= this.hand.props.quan ? this.hand = null : this.hand.props.quan -= wannaPlace)
                } else {
                    const temp = this.items[j][i];
                    this.items[j][i] = this.hand;
                    this.hand = temp.props ? temp : null;
                }
            }
        } else if (mouseButton == RIGHT) {
            if (!this.hand) {
                if (this.items[j][i].props) {
                    const wannaTake = round((this.items[j][i].props.quan || 1) / 2);
                    const whatsLeft = (this.items[j][i].props.quan || 1) - wannaTake;
                    this.hand = this.items[j][i].copy();
                    if (this.items[j][i].props.quan) this.hand.props.quan = wannaTake;
                    if (whatsLeft == 0) this.items[j][i] = new Item();
                    else this.items[j][i].props.quan = whatsLeft;
                }
            } else {
                if (this.hand.props.quan) {
                    if (!this.items[j][i].props) {
                        this.items[j][i] = this.hand.copy();
                        this.items[j][i].props.quan = 1;
                        (this.hand.props.quan == 1 ? this.hand = null : this.hand.props.quan -= 1);
                    } else if (this.items[j][i].matches(this.hand) && this.items[j][i].props.quan) {
                        this.items[j][i].props.quan += 1;
                        (this.hand.props.quan == 1 ? this.hand = null : this.hand.props.quan -= 1);
                    }
                }
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
