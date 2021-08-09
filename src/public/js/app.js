let _settings = localStorage.getItem("settings");
if (_settings == null) {
    _settings = {
        wildSkips: false,
        wildReverses: false,
        skipAfterDraw: true,
        cardCount: 9,
        drawValues: {
            regular: [2],
            wild: [4],
        },
    };
    localStorage.setItem("settings", JSON.stringify(_settings));
} else {
    _settings = JSON.parse(_settings);
}

/**
 * When we update the amount of number cards or a value relating to it, we also need to update the weights as
 * some weights correspond to settings that may have changed; by default we rely on the 9 card meta.
 * we do that here using a Proxy. we also save our settings because why not
 */
const settings = new Proxy(_settings, {
    set: (o, p, v) => {
        o[p] = v;
        updateWeights();
        localStorage.setItem("settings", JSON.stringify(_settings));
    },
});

// Text just overrides value for the card's text content
// this really isn't useful anymore, as we can generate our own randomly now.
// apart from dealEntireDeck() at least. ill keep it in for now but it may be removed eventually
const deck = [
// Red
    { type: "number", color: "red", value: "0" },
    { type: "number", color: "red", value: "1" },
    { type: "number", color: "red", value: "1" },
    { type: "number", color: "red", value: "2" },
    { type: "number", color: "red", value: "2" },
    { type: "number", color: "red", value: "3" },
    { type: "number", color: "red", value: "3" },
    { type: "number", color: "red", value: "4" },
    { type: "number", color: "red", value: "4" },
    { type: "number", color: "red", value: "5" },
    { type: "number", color: "red", value: "5" },
    { type: "number", color: "red", value: "6" },
    { type: "number", color: "red", value: "6" },
    { type: "number", color: "red", value: "7" },
    { type: "number", color: "red", value: "7" },
    { type: "number", color: "red", value: "8" },
    { type: "number", color: "red", value: "8" },
    { type: "number", color: "red", value: "9" },
    { type: "number", color: "red", value: "9" },
    { type: "draw", color: "red", value: "2" },
    { type: "draw", color: "red", value: "2" },
    { type: "skip", color: "red", value: null },
    { type: "skip", color: "red", value: null },
    { type: "reverse", color: "red", value: null },
    { type: "reverse", color: "red", value: null },
    // Yellow
    { type: "number", color: "yellow", value: "0" },
    { type: "number", color: "yellow", value: "1" },
    { type: "number", color: "yellow", value: "1" },
    { type: "number", color: "yellow", value: "2" },
    { type: "number", color: "yellow", value: "2" },
    { type: "number", color: "yellow", value: "3" },
    { type: "number", color: "yellow", value: "3" },
    { type: "number", color: "yellow", value: "4" },
    { type: "number", color: "yellow", value: "4" },
    { type: "number", color: "yellow", value: "5" },
    { type: "number", color: "yellow", value: "5" },
    { type: "number", color: "yellow", value: "6" },
    { type: "number", color: "yellow", value: "6" },
    { type: "number", color: "yellow", value: "7" },
    { type: "number", color: "yellow", value: "7" },
    { type: "number", color: "yellow", value: "8" },
    { type: "number", color: "yellow", value: "8" },
    { type: "number", color: "yellow", value: "9" },
    { type: "number", color: "yellow", value: "9" },
    { type: "draw", color: "yellow", value: "2" },
    { type: "draw", color: "yellow", value: "2" },
    { type: "skip", color: "yellow", value: null },
    { type: "skip", color: "yellow", value: null },
    { type: "reverse", color: "yellow", value: null },
    { type: "reverse", color: "yellow", value: null },
    // Green
    { type: "number", color: "green", value: "0" },
    { type: "number", color: "green", value: "1" },
    { type: "number", color: "green", value: "1" },
    { type: "number", color: "green", value: "2" },
    { type: "number", color: "green", value: "2" },
    { type: "number", color: "green", value: "3" },
    { type: "number", color: "green", value: "3" },
    { type: "number", color: "green", value: "4" },
    { type: "number", color: "green", value: "4" },
    { type: "number", color: "green", value: "5" },
    { type: "number", color: "green", value: "5" },
    { type: "number", color: "green", value: "6" },
    { type: "number", color: "green", value: "6" },
    { type: "number", color: "green", value: "7" },
    { type: "number", color: "green", value: "7" },
    { type: "number", color: "green", value: "8" },
    { type: "number", color: "green", value: "8" },
    { type: "number", color: "green", value: "9" },
    { type: "number", color: "green", value: "9" },
    { type: "draw", color: "green", value: "2" },
    { type: "draw", color: "green", value: "2" },
    { type: "skip", color: "green", value: null },
    { type: "skip", color: "green", value: null },
    { type: "reverse", color: "green", value: null },
    { type: "reverse", color: "green", value: null },
    // Blue
    { type: "number", color: "blue", value: "0" },
    { type: "number", color: "blue", value: "1" },
    { type: "number", color: "blue", value: "1" },
    { type: "number", color: "blue", value: "2" },
    { type: "number", color: "blue", value: "2" },
    { type: "number", color: "blue", value: "3" },
    { type: "number", color: "blue", value: "3" },
    { type: "number", color: "blue", value: "4" },
    { type: "number", color: "blue", value: "4" },
    { type: "number", color: "blue", value: "5" },
    { type: "number", color: "blue", value: "5" },
    { type: "number", color: "blue", value: "6" },
    { type: "number", color: "blue", value: "6" },
    { type: "number", color: "blue", value: "7" },
    { type: "number", color: "blue", value: "7" },
    { type: "number", color: "blue", value: "8" },
    { type: "number", color: "blue", value: "8" },
    { type: "number", color: "blue", value: "9" },
    { type: "number", color: "blue", value: "9" },
    { type: "draw", color: "blue", value: "2" },
    { type: "draw", color: "blue", value: "2" },
    { type: "skip", color: "blue", value: null },
    { type: "skip", color: "blue", value: null },
    { type: "reverse", color: "blue", value: null },
    { type: "reverse", color: "blue", value: null },
    // Wild
    { type: "draw", color: "wild", value: "4" },
    { type: "draw", color: "wild", value: "4" },
    { type: "draw", color: "wild", value: "4" },
    { type: "draw", color: "wild", value: "4" },
    { type: "change", color: "wild", value: null },
    { type: "change", color: "wild", value: null },
    { type: "change", color: "wild", value: null },
    { type: "change", color: "wild", value: null },
    // These dont exist in normal uno but I like them
    // { type: "skip", color: "wild", value: null},
    // { type: "skip", color: "wild", value: null},
    // { type: "skip", color: "wild", value: null},
    // { type: "skip", color: "wild", value: null},
    // { type: "reverse", color: "wild", value: null},
    // { type: "reverse", color: "wild", value: null},
    // { type: "reverse", color: "wild", value: null},
    // { type: "reverse", color: "wild", value: null},
];

const validColors = ["red", "green", "yellow", "blue", "wild"];
const colors = ["red", "green", "yellow", "blue"];
const validTypes = ["number", "change", "draw", "reverse", "skip"];
const styled = {
    "draw": (value) => `+${value}`,
    "reverse": (value) => "\u2B82",
    "skip": (value) => "\u29B8",
};

// This section will be server code eventually, but we're just demonstrating for now.
let weights;
function updateWeights() {
    weights = {
        type: {
            number: (settings.cardCount * 8) + 4,
            draw: 8,
            reverse: 8,
            skip: 8,
            change: 4,
            wildDraw: 4,
            wildReverse: 4,
            wildSkip: 4,
        },
        color: {
            red: (settings.cardCount * 2) + 7,
            yellow: (settings.cardCount * 2) + 7,
            green: (settings.cardCount * 2) + 7,
            blue: (settings.cardCount * 2) + 7,
            wild: 8,
        },
        value: { // Zero has a higher chance of being chosen over regular numbers.
            zero: 4,
            regular: settings.cardCount * 8,
        },
    };
}
updateWeights();

/**
 * Weighted random generation. Courtesy of https://stackoverflow.com/a/1761646.
 * @param {Array} arr The values to be randomly chosen from.
 * @param {Object} weights An object of weights; higher values correspond to a higher likelyhood of being returned.
 * @returns {*} The value that was generated.
 */
function weightedRandom(arr, weight) {
    if (!arr || !weight) throw new Error("Missing an argument");
    let sum = 0;
    for (const val of arr) { // Sum all the weights.
        sum += weight[val] || 0;
    }
    let rand = Math.floor(Math.random() * sum); // Get a random value; 0 >= x > sum.
    for (const val of arr) { // Subtract until we can no longer.
        if (rand < weight[val]) return val;
        rand -= weight[val] || 0;
    }
    throw new Error("This should never happen. Prepare to die.");
}

/**
 * Returns randomly generated card objects.
 * @param {number} length The amount of cards to return.
 * @returns {Array} An array of card objects.
 */
function generateCardData() {
    const color = weightedRandom(["red", "yellow", "green", "blue", "wild"], weights.color);
    let _type;

    if (color == "wild") {
        _type = ["change", "wildDraw"];
        if (settings.wildReverses) _type.push("wildReverse");
        if (settings.wildSkips) _type.push("wildSkip");
    } else {
        _type = ["number", "draw", "reverse", "skip"];
    }

    let type = weightedRandom(_type, weights.type);
    let value;

    if (type == "number") {
        value = weightedRandom(["zero", "regular"], weights.value);
        if (value == "zero") value = 0;
        else value = Math.floor(Math.random() * settings.cardCount);
    } else if (type == "draw" || type == "wildDraw") {
        type = "draw";
        let values;
        if (color == "wild") values = settings["drawValues"]["wild"];
        else values = settings["drawValues"]["regular"];
        value = values[Math.floor(Math.random() * values.length)];
    } else if (type == "reverse" || type == "wildReverse") {
        type = "reverse";
    } else if (type == "skip" || type == "wildSkip") {
        type = "skip";
    }

    return { color: color, type: type, value: value };
}

function generateCardElement(data) {
    // Does the element generation behind cards & adds it to your hand.
    // NOTE: In the future, there should be a Card class, with the creation of the element being up to a getter
    const sleeve = document.getElementById("card-template").content.firstElementChild.cloneNode(true);
    const card = sleeve.querySelector(".card");
    card.classList.add(data.color);
    card.classList.add(data.type);
    card.classList.add("held");
    sleeve.setAttribute("tabindex", "0");
    card.setAttribute("data-color", data.color);
    card.setAttribute("data-type", data.type);
    if (data.value) card.setAttribute("data-value", data.value);
    if (data.type === "number") {
        card.textContent = data.value;
    } else if (Object.prototype.hasOwnProperty.call(styled, data.type)) {
        // The above expression checks if styled[data.type] exists
        const span = document.createElement("span");
        span.textContent = styled[data.type](data.value);
        card.appendChild(span);
    }
    // insertionPoint
    document.getElementById("cards").appendChild(sleeve);
}

// NOTE: Some of these functions need to be interacting with the server in regards to card data
// Such as the deck, the cards you're receiving as a hand, cards you draw, etc. so that cards kept in sync

// NOTE: The hand isn't automatically ordered yet
// All cards in the hand should be grouped by color, then by value
// IE: Red4, Red5, Yellow1, Yellow5, Blue8
// Draw Yellow3 = Red4, Red5, Yellow1, Yellow3, Yellow5, Blue8
// Draw Green6 = Red4, Red5, Yellow1, Yellow5, Green6, Blue8

function drawCard() {
    generateCardElement(generateCardData());
}

function dealHand(amount = 1) {
    for (let i = 0; i < amount; i++) drawCard();
}

function clearHand() {
    // remove all sleeves from #cards
    const hand = Array.from(document.getElementById("cards").querySelectorAll(".sleeve"));
    hand.forEach((element) =>{
        element.remove();
    });
}

// These functions just setup specific card demos

function randomNumber(min = 0, max = 9) {
    // This is min & max inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function demoNormal() {
    // One of each color, randomized, plus +4 and Wild
    clearHand();
    [
        { type: "number", color: "red", value: randomNumber() },
        { type: "number", color: "yellow", value: randomNumber() },
        { type: "number", color: "green", value: randomNumber() },
        { type: "number", color: "blue", value: randomNumber() },
        { type: "change", color: "wild", value: null },
        { type: "draw", color: "wild", value: "4" },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoRandom() {
    // Four randomized number cards
    clearHand();
    [
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoRandomFromDeck() {
    // Six randomized cards from the deck
    clearHand();
    [
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoLotsOfCards() {
    // 8 randomized cards, plus +4 and Wild
    clearHand();
    [
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "number", color: colors[Math.floor(Math.random() * colors.length)], value: randomNumber() },
        { type: "change", color: "wild", value: null },
        { type: "draw", color: "wild", value: "4" },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoDraw() {
    clearHand();
    [
        { type: "draw", color: "red", value: "2" },
        { type: "draw", color: "yellow", value: "2" },
        { type: "draw", color: "green", value: "2" },
        { type: "draw", color: "blue", value: "2" },
        { type: "draw", color: "wild", value: "4" },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoReverse() {
    clearHand();
    [
        { type: "reverse", color: "red", value: null },
        { type: "reverse", color: "yellow", value: null },
        { type: "reverse", color: "green", value: null },
        { type: "reverse", color: "blue", value: null },
        { type: "reverse", color: "wild", value: null },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoSkip() {
    clearHand();
    [
        { type: "skip", color: "red", value: null },
        { type: "skip", color: "yellow", value: null },
        { type: "skip", color: "green", value: null },
        { type: "skip", color: "blue", value: null },
        { type: "skip", color: "wild", value: null },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoWild() {
    clearHand();
    [
        { type: "change", color: "wild", value: null },
        { type: "draw", color: "wild", value: "4" },
        { type: "reverse", color: "wild", value: null },
        { type: "skip", color: "wild", value: null },
    ].forEach((card) => {
        generateCardElement(card);
    });
}

function demoEntireDeck() {
    clearHand();
    // Puts the entire deck in your hand
    deck.forEach((card) => {
        generateCardElement(card);
    });
}

dealHand(50);
