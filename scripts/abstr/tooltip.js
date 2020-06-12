class TooltipText {
    constructor(text, color, size, breakable) {
        this.text = text, this.color = color, this.size = size, this.breakable = breakable;
    }

    draw(x, y) {
        push();
        textSize(this.size);
        noStroke();
        fill(this.color);
        text(this.text.split('~').join(' '), x, y);
        pop();
    }

    separate(charLimit) {
        if (!this.breakable || this.text.length < charLimit) return [this];

        const subs = this.text.split(' ');
        let subHalfOne = [], subHalfTwo = [];
        for (let i = 0; i < round(subs.length / 2); i++) {
            subHalfOne[i] = subs[i];
            subHalfTwo[i] = subs[i + round(subs.length / 2)];
        }

        return [
            new TooltipText(subHalfOne.join(' '), this.color, this.size, true).separate(charLimit),
            new TooltipText(subHalfTwo.join(' '), this.color, this.size, true).separate(charLimit)
        ];
    }

    width() {
        push();
        textSize(this.size);
        const wid = textWidth(this.text);
        pop();
        return wid;
    }

    height() { return this.size/2; }
}
