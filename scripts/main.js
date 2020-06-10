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
        name: 'Sharpened Kitchen Knife',
        desc: "you don't really expect much of the knife, but it's durable nonetheless",
        ench: [
            new Enchant("sharpness", "II"),
            new Enchant("durability", "VI"),
            new Enchant("serrated edge", "IV")
        ],
        type: 'sword',
        rare: 'uncommon',
        imag: state.images['sword_iron']
    }));
}

function draw() {
    push();
    background(colors.black);

    state.inventory.draw(40, 40, 40, 60, 60);

    pop();
}
