function preload() {
    state.font = loadFont('assets/mozart.ttf');

    for (let i = 0; i < normAssets.length; i++)
        for (let j = 0; j < normSuffix.length; j++)
            state.images[normAssets[i] + '_' + normSuffix[j]] = loadImage('assets/' + normAssets[i] + '_' + normSuffix[j] + '.png');
    for (let i of specAssets) state.images[i] = loadImage('assets/' + i + '.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor('assets/cursor.png');
    textFont(state.font);
    imageMode(CENTER);
    frameRate(60);
    noSmooth();

    state.inventory = new Inventory(10, 5);
    state.inventory.add(new Item({
        name: 'Ching and Swing',
        desc: 'As one of the most overpowered weapons in the entire game, this sword can absolutely annihilate any enemy that dares cross paths with it.',
        ench: 'Sharpness~XI, Critical~IV, Strike~VII, Headshot~III, Impaling~V, Looting~VI, Telekinesis~I, Luck~LXIV, Growth~XXVI, Protection~XLII, Ball~Sniper~V, Experience~II, Blong~Glong~I',
        type: 'sword',
        rare: 'legendary',
        imag: state.images['sword_vibranium']
    }));
}

function draw() {
    push();
    background(colors.black);

    state.inventory.draw(40, 40, 40, 60, 60);

    pop();
}
