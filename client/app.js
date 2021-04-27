let _settings = localStorage.getItem("settings");
if (_settings == null) {
    _settings = {
        wildSkips: true,
        wildReverses: true,
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

// This section will be server code eventually, but we're just demonstrating for now.
let weights;
function updateWeights() {
    weights = {
        type: {
            number: (settings.cardCount * 8) + 4,
            draw: 8,
            reverse: 8,
            skip: 8,
            wild: 4,
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
function generateWeightedCards(length = 1) {
    const cards = [];
    for (let i = 0; i < length; i++) {
        const color = weightedRandom(["red", "yellow", "green", "blue", "wild"], weights.color);
        let _type;

        if (color == "wild") {
            _type = ["wild", "wildDraw"];
            if (settings.wildReverses) _type.push("wildReverse");
            if (settings.wildSkips) _type.push("wildSkip");
        } else {
            _type = ["number", "draw", "reverse", "skip"];
        }

        let type = weightedRandom(_type, weights.type);
        let text;
        let value;

        if (type == "number") {
            value = weightedRandom(["zero", "regular"], weights.value);
            if (value == "zero") value = 0;
            else value = Math.floor(Math.random() * settings.cardCount);
        } else if (type == "wild") {
            text = "Wild";
        } else if (type == "draw" || type == "wildDraw") {
            type = "draw";
            let values;
            if (color == "wild") values = settings["drawValues"]["wild"];
            else values = settings["drawValues"]["regular"];
            value = values[Math.floor(Math.random() * values.length)];
            text = `+${value}`;
        } else if (type == "reverse" || type == "wildReverse") {
            type = "reverse";
            text = "\u2B82";
        } else if (type == "skip" || type == "wildSkip") {
            type = "skip";
            text = "\u29B8";
        }

        cards.push({ color: color, type: type, value: value, text: text });
    }
    return cards;
}

const styled = ["reverse", "skip"];
/**
 * Adds cards to the users hand.
 * @param {*} data The card object.
 * @returns {Object} A DOM element.
 */
function generateCard(data) {
    // Does the element generation behind cards & adds it to your hand.
    // NOTE: In the future, this would return the finished card element instead.
    const card = document.getElementById("card-template").content.firstElementChild.cloneNode(true);
    card.classList.add(data.color);
    card.setAttribute("data-color", data.color);
    card.setAttribute("data-type", data.type);
    card.setAttribute("data-value", data.value);
    if (styled.includes(data.type)) {
        const span = document.createElement("span");
        span.classList.add(data.type);
        span.textContent = data.text ? data.text : data.value;
        card.appendChild(span);
    } else {
        card.textContent = data.text ? data.text : data.value;
    }
    // insertionPoint
    document.getElementById("cards-margin-fix").before(card);
    return card;
}

const cards = generateWeightedCards(10);
for (let i = 0; i < cards.length; i++) {
    generateCard(cards[i]);
}
