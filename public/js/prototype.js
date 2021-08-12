// NOTE: Please don't mess with this file
// NOTE: The text property of cards is unnecessary & styled could be implemented better
// NOTE: "Card" should be a class, and the generation of the element could be a simple getter function
// NOTE: Event emitters should be used instead of defer

const generators = {
    colors: {},
    types: {},
};

const validColors = ["red", "green", "yellow", "blue", "wild"];
const validTypes = ["number", "change", "draw", "reverse", "skip"];

const colors = ["red", "green", "yellow", "blue"];
const styled = ["reverse", "skip"];

const types = [];

const cards = {
    normal: [
        { type: "number", color: "red" },
        { type: "number", color: "red" },
        { type: "number", color: "red" },
    ],
    specificCards: [

    ],
    wildParty: [

    ],
};

const deck = {};
