//For a local testing server
//Use command 'python -m SimpleHTTPServer' in a CD'ed terminal

const state = {
  //The game state held inside one object
  inventory: {},
  images: {},
  font: {}
}

function preload() {
  //Load all assets in a syncronous way
  state.font = loadFont('assets/mozart.ttf');

  for (let i = 0; i < normAssets.length; i++)
    for (let j = 0; j < normSuffix.length; j++)
      state.images[normAssets[i] + '_' + normSuffix[j]] = loadImage('assets/' + normAssets[i] + '_' + normSuffix[j] + '.png');
  for (let i of specAssets) state.images[i] = loadImage('assets/' + i + '.png');
}

function setup() {
  //Set up the client
  createCanvas(windowWidth, windowHeight);
  textFont(state.font);
  imageMode(CENTER);
  frameRate(60);
  noSmooth();
  noStroke();

  state.inventory = new Inventory(10, 5);
  state.inventory.add(new Item({
    name: 'Ur mum',
    desc: 'It does absolutely nothing lmao',
    ench: 'no enchants loollll',
    type: 'axe',
    rare: 'legendary',
    imag: state.images['sword_vibranium']
  }));
  state.inventory.add(new Item({
    name: 'Mcyeetus',
    desc: 'It does absolutely nothing lmao',
    ench: 'no enchants loollll',
    type: 'axe',
    rare: 'legendary',
    imag: state.images['armor_iron']
  }));
  state.inventory.add(new Item({
    name: 'Ur mum',
    desc: 'It does absolutely nothing lmao',
    ench: 'no enchants loollll',
    type: 'axe',
    rare: 'legendary',
    imag: state.images['axe_uranium']
  }));
  state.inventory.add(new Item({
    name: 'Ur mum',
    desc: 'It does absolutely nothing lmao',
    ench: 'no enchants loollll',
    type: 'axe',
    rare: 'legendary',
    imag: state.images['helmet_diamond']
  }));
}

function draw() {
  //Called every frame to draw everything
  push();
  background(26);

  state.inventory.draw(40, 40, 40, 60, 60);

  pop();
}

function mouseHovering(x, y, r) {
  return sqrt(pow(x - mouseX, 2) + pow(y - mouseY, 2)) < r;
}
