let _settings = localStorage.getItem("settings");
if(_settings == null) {
    _settings = {
        wildSkips: true,
        wildReverses: true,
        cardCount: 9,
        drawValues: {
            regular: [2],
            wild: [4]
        }
    };
    localStorage.setItem("settings", JSON.stringify(_settings));
} else {
    _settings = JSON.parse(_settings);
}

/*
    when we update the amount of number cards or a value relating to it, we also need to update the weights as
    some weights correspond to settings that may have changed; by default we rely on the 9 card meta. 
    we do that here using a Proxy. we also save our settings because why not
*/
const settings = new Proxy(_settings, {
    set: (o, p, v) => {
        o[p] = v
        updateWeights();
        localStorage.setItem("settings", JSON.stringify(_settings));
    }
});

/* ------------------------------------------------------------------------------ */
// this section will be server code eventually, but we're just demonstrating for now

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
            wildSkip: 4
        },
        color: {
            red: (settings.cardCount * 2) + 7,
            yellow: (settings.cardCount * 2) + 7,
            green: (settings.cardCount * 2) + 7,
            blue: (settings.cardCount * 2) + 7,
            wild: 8,
        },
        value: { // the number zero has less of a chance to be chosen over other numbers
            zero: 4,
            regular: settings.cardCount * 8 // if this is the result its a simple random choice between 1 and 9
        }
    };
}
updateWeights();

// courtesy of https://stackoverflow.com/a/1761646
function weightedRandom(arr, weights) {
    if(!arr || !weights) throw new Error("Missing an argument");
    let sum = 0;
    for(const val of arr) { // sum all weights
        sum += weights[val] || 0;
    }
    let rand = Math.floor(Math.random() * sum); // get a random value between 0 inclusive and the sum uninclusive
    for(const val of arr) { // subtract until we can subtract no more
        if(rand < weights[val]) return val;
        rand -= weights[val] || 0;
    }
    throw new Error("This should never happen. Prepare to die.");
}

// generates cards using the calculated weights
function generateWeightedCards(length = 1) {
    let cards = [];
    for(i = 0; i < length; i++) {
        let color = weightedRandom(["red", "yellow", "green", "blue", "wild"], weights.color);
        let _type;

        if(color == "wild") {
            _type = ["wild", "wildDraw"];
            if(settings.wildReverses) _type.push("wildReverse");
            if(settings.wildSkips) _type.push("wildSkip");
        } else {
            _type = ["number", "draw", "reverse", "skip"];
        }

        let type = weightedRandom(_type, weights.type);
        let text;
        let value;

        if(type == "number") {
            value = weightedRandom(["zero", "regular"], weights.value);
            if(value == "zero") value = 0;
            else value = Math.floor(Math.random() * settings.cardCount);
        } else if(type == "wild") {
            text = "Wild"; 
        } else if(type == "draw" || type == "wildDraw") {
            type = "draw";
            let values;
            if(color == "wild") values = settings["drawValues"]["wild"];
            else values = settings["drawValues"]["regular"];
            value = values[Math.floor(Math.random() * values.length)];
            text = `+${value}`;
        } else if(type == "reverse" || type == "wildReverse") {
            type = "reverse";
            text = "\u2B82";
        } else if(type == "skip" || type == "wildSkip") {
            type = "skip";
            text = "\u29B8";
        }

        cards.push({ color: color, type: type, value: value, text: text });
    }
    return cards;
}

/* ------------------------------------------------------------------------------ */

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

let cards = generateWeightedCards(10);
for(i = 0; i < cards.length; i++) {
    generateCard(cards[i]);
}