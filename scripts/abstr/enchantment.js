class Enchant {
    constructor(type, level) {
        this.type = type;
        this.level = level;
    }

    stringify() {
        return this.type.split(" ").join("~") + "~" + romanize(this.level);
    }
}
