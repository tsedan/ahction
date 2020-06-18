class Inventory {
    constructor(cols, rows) {
        this.items = [];
        for (let i = 0; i < rows; i++) {
            this.items[i] = [];
            for (let j = 0; j < cols; j++) this.items[i][j] = new Item();
        }
        this.wid = cols, this.hei = rows;
        this.active = true;
    }

    draw(x, y, d, s=d*spacing) {
        push();

        let hov = null;
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++) {
                fill(this.items[j][i].backcolor);
                if (!hov && mouseInCircle(x + i*s, y + j*s, d/2)) {
                    hov = [i, j];
                    fill(state.colors.lightgray);
                }
                circle(x + i*s, y + j*s, d);
                this.items[j][i].draw(x + i*s, y + j*s, d);
            }

        if (hov) this.items[hov[1]][hov[0]].tooltip();

        pop();
    }

    hoverLoc(x, y, d, s=d*spacing) {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseInCircle(x + i*s, y + j*s, d/2)) { return [i, j]; }
        return [null, null];
    }

    add(item) {
        for (let j = 0; j < this.wid; j++) {
            for (let i = 0; i < this.hei; i++) {
                if (this.items[i][j].matches(item) && item.props.quan) {

                    const wannaPlace = stackSize - this.items[i][j].props.quan;
                    if (wannaPlace == 0) continue;
                    this.items[i][j].backcolor = state.colors.itemupdate;
                    if (wannaPlace >= item.props.quan) {
                        this.items[i][j].props.quan += item.props.quan;
                        return true;
                    }
                    this.items[i][j].props.quan = stackSize;
                    item.props.quan -= wannaPlace;

                } else if (!this.items[i][j].props) {

                    if (!item.props.quan) {
                        this.items[i][j] = item.copy();
                        this.items[i][j].backcolor = state.colors.itemupdate;
                        return true;
                    } else {
                        this.items[i][j] = item.copy();
                        this.items[i][j].backcolor = state.colors.itemupdate;
                        if (item.props.quan < stackSize) {
                            return true;
                        } else {
                            this.items[i][j].props.quan = stackSize;
                            item.props.quan -= stackSize;
                        }
                    }

                }
            }
        }

        return false;
    }
}
