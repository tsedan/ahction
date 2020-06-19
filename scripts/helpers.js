function updateScale() {
    const size = getSize();
    state.scale = size[0]/40;
    state.invtabs.updateAll();
}

function getSize() {
    const ratio = width/height;
    const rwid = (ratio < aspectratio ? width : height*aspectratio);
    const rhei = (ratio < aspectratio ? width/aspectratio : height);
    return [rwid, rhei];
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

function drawBackground() {
    push();

    const lineSize = state.scale, radius = windowWidth / 2;
    const mX = cos(frameCount / 4000) * radius, mY = sin(frameCount / 4000) * radius;
    strokeWeight(state.scale/7);
    stroke(state.colors.darkgray);

    //todo: optimize to only loop within window
    for (let i = -windowWidth; i < 2 * windowWidth; i += lineSize)
        for (let j = -windowHeight; j < 2 * windowHeight; j += lineSize) {
            const xLoc = i - mX, yLoc = j - mY;
            if (xLoc >= -lineSize && xLoc <= windowWidth + lineSize && yLoc >= -lineSize && yLoc <= windowHeight + lineSize)
                round(noise(i, j)) ? line(xLoc, yLoc, xLoc + lineSize, yLoc + lineSize) : line(xLoc + lineSize, yLoc, xLoc, yLoc + lineSize);
        }

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
