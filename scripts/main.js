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

    state.invtabs.add(new Inventory(10, 5), invStr);

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
}

function draw() {
    push();

    background(state.colors.black);
    //drawBackground(); commented because it needs to be optimized before use

    state.invtabs.draw(40, 40);

    state.hand.draw();

    pop();
}

function doubleClicked() {
    //handleDouble(40, 40);
}

function mouseDragged() {
    //handleDrag(40, 40);
}

function mousePressed() {
    //handlePress(40, 40);
}
