const state = {
    invtabs: new Tabs(),

    hand: new Hand(),

    images: {},
    font: {},
    colors: {},

    scale: 40
}

const stackSize = 80;
const spacing = 1.5;

const invStr = 'inventory';

const normPrefix = ['armor','axe','boots','bow','helmet','ingot','leg','ore','shield','sword'];
const normSuffix = ['rust','sapphire','emerald','dragon'];
const specAssets = [
    'book_1','book_2','book_3','book_4','book_5','book_6','book_eye','book_ultra',
    'chest_dummy','chest_disciple','chest_master','chest_ace','chest_mkit',
    'ingot_gold','key_silver','key_gold','ore_gold','hilt','null'
];

const textSizes = {
    name: 48,
    default: 32,
    space: 24,
    tab: 18
}
