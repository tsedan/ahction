function invDouble(x, y, d, s=d*invSpacing) {
    const [i, j] = state.inventory.hoverLoc(x, y, d, s);
    if (i == null || j == null) return;

    const isItem = state.inventory.items[j][i].props, isHand = state.inventory.hand;

    if ((!isItem && !isHand) || (isItem && !state.inventory.items[j][i].props.quan) || (isHand && !state.inventory.hand.props.quan)) return;

    if (isHand && isItem) {
        if (!state.inventory.hand.matches(state.inventory.items[j][i])) return;
        const wannaPlace = stackSize - state.inventory.hand.props.quan;
        state.inventory.hand.props.quan += min(state.inventory.items[j][i].props.quan, wannaPlace);
        if (wannaPlace >= state.inventory.items[j][i].props.quan) {
            state.inventory.items[j][i] = new Item();
        } else {
            state.inventory.items[j][i].props.quan -= wannaPlace;
            return;
        }
    } else if (isItem) {
        state.inventory.hand = state.inventory.items[j][i].copy();
        state.inventory.items[j][i] = new Item();
    }

    if (state.inventory.hand.props.quan == stackSize) return;

    //todo: grab similar items from the inv
}

function invDrag(x, y, d, s=d*invSpacing) {
    const [i, j] = state.inventory.hoverLoc(x, y, d, s);
    if (i == null || j == null) return;

    if (mouseButton == RIGHT) {
        if (state.inventory.hand && state.inventory.hand.props.quan) {
            if (!state.inventory.items[j][i].props) {
                state.inventory.items[j][i] = state.inventory.hand.copy();
                state.inventory.items[j][i].props.quan = 1;
                (state.inventory.hand.props.quan == 1 ? state.inventory.hand = null : state.inventory.hand.props.quan -= 1);
            }
        }
    }

    //todo: maybe add a left button event for evenly distributing items
}

function invPress(x, y, d, s=d*invSpacing) {
    const [i, j] = state.inventory.hoverLoc(x, y, d, s);
    if (i == null || j == null) return;

    if (mouseButton == LEFT) {
        if (!state.inventory.hand) {
            if (state.inventory.items[j][i].props) {
                state.inventory.hand = state.inventory.items[j][i];
                state.inventory.items[j][i] = new Item();
            }
        } else {
            if (state.inventory.items[j][i].matches(state.inventory.hand) && (state.inventory.items[j][i].props.quan && state.inventory.hand.props.quan)) {
                const wannaPlace = stackSize - state.inventory.items[j][i].props.quan;
                state.inventory.items[j][i].props.quan += min(state.inventory.hand.props.quan, wannaPlace);
                (wannaPlace >= state.inventory.hand.props.quan ? state.inventory.hand = null : state.inventory.hand.props.quan -= wannaPlace);
            } else {
                const temp = state.inventory.items[j][i];
                state.inventory.items[j][i] = state.inventory.hand;
                state.inventory.hand = temp.props ? temp : null;
            }
        }
    } else if (mouseButton == RIGHT) {
        if (!state.inventory.hand) {
            if (state.inventory.items[j][i].props) {
                const wannaTake = round((state.inventory.items[j][i].props.quan || 1) / 2);
                const whatsLeft = (state.inventory.items[j][i].props.quan || 1) - wannaTake;
                state.inventory.hand = state.inventory.items[j][i].copy();
                if (state.inventory.items[j][i].props.quan) state.inventory.hand.props.quan = wannaTake;
                if (whatsLeft == 0) state.inventory.items[j][i] = new Item();
                else state.inventory.items[j][i].props.quan = whatsLeft;
            }
        } else {
            if (state.inventory.hand.props.quan) {
                if (!state.inventory.items[j][i].props) {
                    state.inventory.items[j][i] = state.inventory.hand.copy();
                    state.inventory.items[j][i].props.quan = 1;
                    (state.inventory.hand.props.quan == 1 ? state.inventory.hand = null : state.inventory.hand.props.quan -= 1);
                } else if (state.inventory.items[j][i].matches(state.inventory.hand) && state.inventory.items[j][i].props.quan) {
                    state.inventory.items[j][i].props.quan += 1;
                    (state.inventory.hand.props.quan == 1 ? state.inventory.hand = null : state.inventory.hand.props.quan -= 1);
                }
            }
        }
    }
}

function mouseInCircle(x, y, r) {
    return sqrt(pow(x - mouseX, 2) + pow(y - mouseY, 2)) < r;
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

    const lineSize = 40, radius = windowWidth / 2;
    const mX = cos(frameCount / 4000) * radius, mY = sin(frameCount / 4000) * radius;
    strokeWeight(6);
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
        white: color('#dfe6e9'),
        lightgray: color('#b2bec3'),
        gray: color('#636e72'),
        darkgray: color('#2d3436'),
        black: color('#1c1e1f')
    }

    state.colors.legendary = state.colors.yellow;
    state.colors.epic = state.colors.lightpurple;
    state.colors.rare = state.colors.blue;
    state.colors.uncommon = state.colors.green;
    state.colors.common = state.colors.white;

    state.colors.itemupdate = state.colors.green;
}
