function updateScale() {
    const size = getSize();
    state.scale = size[0]/40;
    state.invtabs.update();
}

function getSize() {
    return [(width < aspectratio*height ? width : height*aspectratio),
        (width < aspectratio*height ? width/aspectratio : height)];
}

function mouseInCircle(x, y, r) {
    return sqrt(pow(x - mouseX, 2) + pow(y - mouseY, 2)) < r;
}

function mouseInRect(x, y, w, h) {
    if (abs(w) != w) { x = x+w; w = abs(w); }
    if (abs(h) != h) { y = y+h; h = abs(h); }
    return mouseX >= x && mouseY >= y && mouseX <= x+w && mouseY <= y+h;
}

function romanize(num) {
    const digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"];
    let roman = "", i = 3;
    while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function drawFrameRate() {
    push();

    textSize(textSizes.space * state.scale/originalscale);
    textAlign(LEFT, TOP);
    fill(state.colors.perfectwhite);
    text(int(frameRate()), 0, 0);

    pop();
}

function drawBackground() {
    push();

    const lineSize = state.scale;
    const offX = lineSize*(mouseX-width/2)/width;
    const offY = lineSize*(mouseY-height/2)/height;

    strokeWeight(lineSize/7);
    stroke(state.colors.lightblack);

    for (let i = -lineSize; i < width+lineSize; i += lineSize)
        for (let j = -lineSize; j < height+lineSize; j += lineSize)
            round(noise(i, j)) ? line(i-offX,j-offY,i-offX+lineSize,j-offY+lineSize) : line(i-offX+lineSize,j-offY,i-offX,j-offY+lineSize);

    pop();
}

function initColors() {
    state.colors = {
        lightgreen: color('#55efc4'),
        green: color('#00b894'),
        lightyellow: color('#ffeaa7'),
        yellow: color('#fdcb6e'),
        lightteal: color('#81ecec'),
        teal: color('#00cec9'),
        lightorange: color('#fab1a0'),
        orange: color('#e17055'),
        lightblue: color('#74b9ff'),
        blue: color('#0984e3'),
        lightred: color('#ff7675'),
        red: color('#d63031'),
        lightpurple: color('#a29bfe'),
        purple: color('#6c5ce7'),
        lightpink: color('#fd79a8'),
        pink: color('#e84393'),
        lightgray: color('#b2bec3'),
        gray: color('#636e72'),
        darkgray: color('#2d3436'),
        lightblack: color('#222425'),
        black: color('#1c1e1f'),
        snow: color('#dfe6e9'),
        white: color('#efefef'),

        perfectblack: color('#000000'),
        perfectwhite: color('#ffffff')
    }

    state.colors.legendary = state.colors.yellow;
    state.colors.epic = state.colors.lightpurple;
    state.colors.rare = state.colors.blue;
    state.colors.uncommon = state.colors.green;
    state.colors.common = state.colors.white;

    state.colors.itemupdate = state.colors.green;
}

function initDemoTabs() {
    state.invtabs.initpos(function() {
        this.x = width - state.scale;
        this.y = state.scale;
        this.d = state.scale;
        this.s = this.d*spacing;
    });

    state.invtabs.add(new Inventory(11, 5, invStr));
    state.invtabs.add(new Inventory(1, 1, 'banana'));

    state.invtabs.active = invStr;

    state.invtabs.tabs[invStr].add(new Item({
        name: 'Sharpened Kitchen Knife',
        desc: "a relatively durable watchamajig",
        ench: [
            new Enchant("sharpness", 2),
            new Enchant("durability", 6),
            new Enchant("serrated edge", 4)
        ],
        move: [
            new Move("shank"),
            new Move("uppercut"),
            new Move("mince"),
            new Move("heimlich maneuver")
        ],
        type: 'sword',
        rare: 'uncommon',
        suff: 'rust'
    }));

    state.invtabs.tabs[invStr].add(new Item({
        name: 'Dragon Ore',
        type: 'ore',
        rare: 'legendary',
        suff: 'dragon',
        quan: 5
    }));

    state.invtabs.tabs[invStr].add(new Item({
        name: 'Emerald Ingot',
        type: 'ingot',
        rare: 'epic',
        suff: 'emerald',
        quan: 103
    }));

    state.invtabs.tabs['banana'].add(new Item({
        name: 'banana',
        desc: 'it is a banana',
        type: 'banana',
        rare: 'yellow',
        imag: 'ingot_gold'
    }));
}
