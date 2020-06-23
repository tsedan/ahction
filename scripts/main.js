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

    initDemoTabs();
}

function draw() {
    background(state.colors.black);
    //drawBackground();

    state.invtabs.draw();
    state.hand.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateScale();
}

function doubleClicked() {
    state.invtabs.handleDouble();
}

function mouseDragged() {
    state.invtabs.handleDrag();
}

function mousePressed() {
    state.invtabs.handlePress();
}
