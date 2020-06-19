class ItemTable {
    constructor(cols, rows, label) {
        this.items = [];
        for (let i = 0; i < rows; i++) {
            this.items[i] = [];
            for (let j = 0; j < cols; j++) this.items[i][j] = new Item();
        }
        this.wid = cols, this.hei = rows;
        this.label = label;
        this.hor = 1;
    }

    handleDouble(x, y, d, s) {}
    handleDrag(x, y, d, s) {}
    handlePress(x, y, d, s) {}

    draw(x, y, d, s) {
        push();

        let hov = null;
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++) {
                fill(this.items[j][i].backcolor);
                if (!hov && mouseInCircle(x + i*s*this.hor, y + j*s, d/2)) {
                    hov = [i, j];
                    fill(state.colors.lightgray);
                }
                circle(x + i*s*this.hor, y + j*s, d);
                this.items[j][i].draw(x + i*s*this.hor, y + j*s, d);
            }

        if (hov) this.items[hov[1]][hov[0]].tooltip();

        pop();
    }

    hoverLoc(x, y, d, s) {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseInCircle(x + i*s*this.hor, y + j*s, d/2)) { return [i, j]; }
        return [null, null];
    }

    add(item) {
        for (let j = 0; j < this.wid; j++) {
            for (let i = 0; i < this.hei; i++) {
                if (this.items[i][j].matches(item) && item.props.stac) {
                    const wannaPlace = stackSize - this.items[i][j].props.quan;
                    if (wannaPlace == 0) continue;
                    this.items[i][j].backcolor = state.colors.itemupdate;
                    if (wannaPlace >= item.props.quan) {
                        this.items[i][j].props.quan += item.props.quan;
                        return true;
                    }
                    item.props.quan -= wannaPlace;
                } else if (this.items[i][j].props.isNull) {
                    this.items[i][j] = item.copy();
                    this.items[i][j].backcolor = state.colors.itemupdate;
                    if (!item.props.stac || item.props.quan <= stackSize) return true;
                    item.props.quan -= stackSize;
                    this.items[i][j].props.quan = stackSize;
                }
            }
        }

        return false;
    }

    updateAll() {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                this.items[j][i].update();
    }
}
