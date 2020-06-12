class Inventory {
    constructor(cols, rows) {
        this.items = [];
        for (let i = 0; i < rows; i++) {
            this.items[i] = [];
            for (let j = 0; j < cols; j++) this.items[i][j] = new Item();
        }
        this.wid = cols, this.hei = rows;
        this.held = null;
    }

    draw(x, y, d, sx, sy) {
        push();

        noStroke();
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++) {
                fill(mouseHovering(x + i*sx, y + j*sy, d/2) ? 116 : 94);
                circle(x + i*sx, y + j*sy, d);
            }

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (this.held == null || (this.held[0] != j || this.held[1] != i)) this.items[j][i].draw(x + i*sx, y + j*sy, d);

        if (this.held != null) this.items[this.held[0]][this.held[1]].draw(mouseX,mouseY,d);

        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseHovering(x + i*sx, y + j*sy, d/2) && (this.held == null || (this.held[0] != j || this.held[1] != i)))
                    this.items[j][i].tooltip();

        pop();
    }

    testHold(x, y, d, sx, sy) {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseHovering(x + i*sx, y + j*sy, d/2)) {
                    if (this.held == null) {
                        if (this.items[j][i].props) this.held = [j,i];
                    } else {
                        this.swap(this.held[1], this.held[0], i, j);
                        this.held = null;
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

    swap(col1, row1, col2, row2) {
        const tempItem = this.items[row1][col1];
        this.items[row1][col1] = this.items[row2][col2];
        this.items[row2][col2] = tempItem;
    }
}
