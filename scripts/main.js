function preload() {
    state.font = loadFont('assets/mozart.ttf');

    for (let prefix of normPrefix)
        for (let suffix of normSuffix)
            state.images[prefix + '_' + suffix] = loadImage('assets/' + prefix + '/' + suffix + '.png');
    for (let i of specAssets) state.images[i] = loadImage('assets/' + i + '.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor('assets/cursor.png');
    textFont(state.font);
    imageMode(CENTER);
    frameRate(60);
    noSmooth();
    noStroke();

    initColors();

    state.inventory = new Inventory(10, 5);
    state.inventory.add(new Item({
        name: 'Sharpened Kitchen Knife',
        desc: "a relatively durable watchamajig",
        ench: [
            new Enchant("sharpness", 2),
            new Enchant("durability", 6),
            new Enchant("serrated edge", 4)
        ],
        type: 'sword',
        rare: 'uncommon',
        suff: 'rust'
    }));

    state.inventory.add(new Item({
        name: 'Dragon Ore',
        type: 'ore',
        rare: 'legendary',
        suff: 'dragon',
        quan: 5
    }));

    state.inventory.add(new Item({
        name: 'Emerald Ingot',
        type: 'ingot',
        rare: 'epic',
        suff: 'emerald',
        quan: 23
    }));
}

function draw() {
    push();

    background(state.colors.black);
    drawBackground();

    if (state.inventory.active) state.inventory.draw(40, 40, 40);

    pop();
}

function doubleClicked() {
    if (state.inventory.active) state.inventory.mouseDouble(40, 40, 40);
}

function mouseDragged() {
    if (state.inventory.active) state.inventory.mouseDrag(40, 40, 40);
}

function mousePressed() {
    if (state.inventory.active) state.inventory.mousePress(40, 40, 40);
}
