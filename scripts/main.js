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
    updateScale();

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
        rare: 'legendary',
        imag: 'ingot_gold',
    }));
}

function draw() {
    const size = getSize();

    push();

    background(state.colors.black);

    const off = state.scale/4;
    stroke(state.colors.darkgray);
    strokeWeight(off);
    noFill();
    rectMode(CENTER);
    rect(width/2, height/2, size[0]-off, size[1]-off);

    pop();
    push();

    state.invtabs.draw(width/2 - size[0]/2 + state.scale, height/2 - size[1]/2 + state.scale);

    state.hand.draw();

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateScale();
}

function doubleClicked() {
    const size = getSize();
    state.invtabs.handleDouble(width/2 - size[0]/2 + state.scale, height/2 - size[1]/2 + state.scale);
}

function mouseDragged() {
    const size = getSize();
    state.invtabs.handleDrag(width/2 - size[0]/2 + state.scale, height/2 - size[1]/2 + state.scale);
}

function mousePressed() {
    const size = getSize();
    state.invtabs.handlePress(width/2 - size[0]/2 + state.scale, height/2 - size[1]/2 + state.scale);
}
