class Enchant {
    constructor(type, level) {
        this.type = type;
        this.level = level;
    }

    stringify() {
        return this.type.split(" ").join("~") + "~" + romanize(this.level);
    }
}

class Move {
    constructor(type) {
        this.type = type;
    }

    stringify() {
        return this.type.split(" ").join("~");
    }
}

class Hand {
    constructor() {
        this.nullify();
    }

    draw(d) {
        if (this.holding) this.item.draw(mouseX,mouseY,d);
    }

    nullify() {
        this.item = null;
        this.origin = null;
        this.holding = false;
    }

    setHand(item, origin) {
        if (!item || !item.props || !origin) return;
        this.item = item;
        this.origin = origin;
        this.holding = true;
    }
}
