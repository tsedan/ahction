const state = {
    inventory: {},
    images: {},
    font: {}
}

const normAssets = ['armor','axe','boots','bow','helmet','ingot','leg','ore','shield','sword'];
const normSuffix = ['iron','diamond','uranium','vibranium'];
const specAssets = [
    'book_1','book_2','book_3','book_4','book_5','book_6','book_eye','book_ultra',
    'chest_dummy','chest_disciple','chest_master','chest_ace','chest_mkit',
    'ingot_gold','item_back','key_silver','key_gold','ore_gold'
];

const colors = {
    lightgreen: '#55efc4',
    green: '#00b894',
    lightyellow: '#ffeaa7',
    yellow: '#fdcb6e',
    lightteal: '#81ecec',
    teal: '#00cec9',
    lightorange: '#fab1a0',
    orange: '#e17055',
    lightblue: '#74b9ff',
    blue: '#0984e3',
    lightred: '#ff7675',
    red: '#d63031',
    lightpurple: '#a29bfe',
    purple: '#6c5ce7',
    lightpink: '#fd79a8',
    pink: '#e84393',
    white: '#dfe6e9',
    lightgray: '#b2bec3',
    gray: '#636e72',
    darkgray: '#2d3436',
    black: '#1c1e1f'
};

const rareToColor = {
    legendary : colors.yellow,
    epic : colors.lightpurple,
    rare : colors.blue,
    uncommon : colors.green,
    common : colors.white
}

const textSizes = {
    name: 48,
    default: 32,
    space: 24
}
