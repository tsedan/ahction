class Inventory {
    constructor(cols, rows) {
        this.items = [];
        for (let i = 0; i < rows; i++) {
            this.items[i] = [];
            for (let j = 0; j < cols; j++) this.items[i][j] = new Item();
        }
        this.wid = cols, this.hei = rows;
        this.hand = null;
        this.active = true;
    }

    draw(x, y, d, s=d*invSpacing) {
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

        if (this.hand) this.hand.draw(mouseX,mouseY,d);
        if (hov) this.items[hov[1]][hov[0]].tooltip();

        pop();
    }

    hoverLoc(x, y, d, s=d*invSpacing) {
        for (let i = 0; i < this.wid; i++)
            for (let j = 0; j < this.hei; j++)
                if (mouseInCircle(x + i*s, y + j*s, d/2)) { return [i, j]; }
        return [null, null];
    }

    mouseDouble(x, y, d, s=d*invSpacing) {
        const [i, j] = this.hoverLoc(x, y, d, s);
        if (i == null || j == null) return;

        const isItem = this.items[j][i].props, isHand = this.hand;

        if ((!isItem && !isHand) || (isItem && !this.items[j][i].props.quan) || (isHand && !this.hand.props.quan)) return;

        if (isHand && isItem) {
            if (!this.hand.matches(this.items[j][i])) return;
            const wannaPlace = stackSize - this.hand.props.quan;
            this.hand.props.quan += min(this.items[j][i].props.quan, wannaPlace);
            if (wannaPlace >= this.items[j][i].props.quan) {
                this.items[j][i] = new Item();
            } else {
                this.items[j][i].props.quan -= wannaPlace;
                return;
            }
        } else if (isItem) {
            this.hand = this.items[j][i].copy();
            this.items[j][i] = new Item();
        }

        if (this.hand.props.quan == stackSize) return;

        //todo: grab similar items from the inv
    }

    mouseDrag(x, y, d, s=d*invSpacing) {
        const [i, j] = this.hoverLoc(x, y, d, s);
        if (i == null || j == null) return;

        if (mouseButton == RIGHT) {
            if (this.hand && this.hand.props.quan) {
                if (!this.items[j][i].props) {
                    this.items[j][i] = this.hand.copy();
                    this.items[j][i].props.quan = 1;
                    (this.hand.props.quan == 1 ? this.hand = null : this.hand.props.quan -= 1);
                }
            }
        }

        //todo: maybe add a left button event for evenly distributing items
    }

    mousePress(x, y, d, s=d*invSpacing) {
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
                    (wannaPlace >= this.hand.props.quan ? this.hand = null : this.hand.props.quan -= wannaPlace);
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
