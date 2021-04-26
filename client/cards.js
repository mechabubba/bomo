// Would be more pragmatic to define limits for cards as numbers which could
// be depleted, rather than defining an entire deck. But I haven't thought
// of a way to to do it while retaining customizability
const deckLimits = {};

// Text just overrides value for the card's text content
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
  { type: "draw", color: "red", value: "2", text: "+2" },
  { type: "draw", color: "red", value: "2", text: "+2" },
  { type: "skip", color: "red", value: null, text: "⦸" },
  { type: "skip", color: "red", value: null, text: "⦸" },
  { type: "reverse", color: "red", value: null, text: "⮂" },
  { type: "reverse", color: "red", value: null, text: "⮂" },
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
  { type: "draw", color: "yellow", value: "2", text: "+2" },
  { type: "draw", color: "yellow", value: "2", text: "+2" },
  { type: "skip", color: "yellow", value: null, text: "⦸" },
  { type: "skip", color: "yellow", value: null, text: "⦸" },
  { type: "reverse", color: "yellow", value: null, text: "⮂" },
  { type: "reverse", color: "yellow", value: null, text: "⮂" },
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
  { type: "draw", color: "green", value: "2", text: "+2" },
  { type: "draw", color: "green", value: "2", text: "+2" },
  { type: "skip", color: "green", value: null, text: "⦸" },
  { type: "skip", color: "green", value: null, text: "⦸" },
  { type: "reverse", color: "green", value: null, text: "⮂" },
  { type: "reverse", color: "green", value: null, text: "⮂" },
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
  { type: "draw", color: "blue", value: "2", text: "+2" },
  { type: "draw", color: "blue", value: "2", text: "+2" },
  { type: "skip", color: "blue", value: null, text: "⦸" },
  { type: "skip", color: "blue", value: null, text: "⦸" },
  { type: "reverse", color: "blue", value: null, text: "⮂" },
  { type: "reverse", color: "blue", value: null, text: "⮂" },
  // Wild
  { type: "draw", color: "wild", value: "4", text: "+4" },
  { type: "draw", color: "wild", value: "4", text: "+4" },
  { type: "draw", color: "wild", value: "4", text: "+4" },
  { type: "draw", color: "wild", value: "4", text: "+4" },
  { type: "change", color: "wild", value: null, text: "Wild" },
  { type: "change", color: "wild", value: null, text: "Wild" },
  { type: "change", color: "wild", value: null, text: "Wild" },
  { type: "change", color: "wild", value: null, text: "Wild" },
  // These dont exist in normal uno but I like them
  { type: "skip", color: "wild", value: null, text: "⦸" },
  { type: "skip", color: "wild", value: null, text: "⦸" },
  { type: "skip", color: "wild", value: null, text: "⦸" },
  { type: "skip", color: "wild", value: null, text: "⦸" },
  { type: "reverse", color: "wild", value: null, text: "⮂" },
  { type: "reverse", color: "wild", value: null, text: "⮂" },
  { type: "reverse", color: "wild", value: null, text: "⮂" },
  { type: "reverse", color: "wild", value: null, text: "⮂" },
];

const validColors = ["red", "green", "yellow", "blue", "wild"];
const colors = ["red", "green", "yellow", "blue"];
const validTypes = ["number", "change", "draw", "reverse", "skip"];
const styled = ["reverse", "skip"];

// NOTE: The hand isn't automatically ordered yet
// All cards in the hand should be grouped by color, then by value
// IE: Red4, Red5, Yellow1, Yellow5, Blue8
// Draw Yellow3 = Red4, Red5, Yellow1, Yellow3, Yellow5, Blue8
// Draw Green6 = Red4, Red5, Yellow1, Yellow5, Green6, Blue8

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
}

// NOTE: Some of these functions need to be interacting with the server in regards to card data
// Such as the deck, the cards you're receiving a hand, etc.
// So that the deck is kept in sync with all players.

function addCard() {
  // Unfinished. Essentially will take input, fill in empty values with random ones, and
  // passes that custom card data into generateCard() to add it to your hand
}

function drawCard() {
  // Unfinished. Would draw a single card from the deck, but with server side logic, this
  // would work differently.
}

function dealHand() {
  // Unfinished. Would deal X cards to the client from the deck, but with server side logic, this
  // would work differently.
}

function clearHand() {
  // remove all elements with class .card that are children of #cards
  const hand = Array.from(document.getElementById("cards").querySelectorAll(".card"));
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
    { type: "change", color: "wild", value: null, text: "Wild" },
    { type: "draw", color: "wild", value: "4", text: "+4" },
  ].forEach((element) => {
    generateCard(element);
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
  ].forEach((element) => {
    generateCard(element);
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
  ].forEach((element) => {
    generateCard(element);
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
    { type: "change", color: "wild", value: null, text: "Wild" },
    { type: "draw", color: "wild", value: "4", text: "+4" },
  ].forEach((element) => {
    generateCard(element);
  });
}

function demoDraw() {
  clearHand();
  [
    { type: "draw", color: "red", value: "2", text: "+2" },
    { type: "draw", color: "yellow", value: "2", text: "+2" },
    { type: "draw", color: "green", value: "2", text: "+2" },
    { type: "draw", color: "blue", value: "2", text: "+2" },
    { type: "draw", color: "wild", value: "4", text: "+4" },
  ].forEach((element) => {
    generateCard(element);
  });
}

function demoReverse() {
  clearHand();
  [
    { type: "reverse", color: "red", value: null, text: "⮂" },
    { type: "reverse", color: "yellow", value: null, text: "⮂" },
    { type: "reverse", color: "green", value: null, text: "⮂" },
    { type: "reverse", color: "blue", value: null, text: "⮂" },
    { type: "reverse", color: "wild", value: null, text: "⮂" },
  ].forEach((element) => {
    generateCard(element);
  });
}

function demoSkip() {
  clearHand();
  [
    { type: "skip", color: "red", value: null, text: "⦸" },
    { type: "skip", color: "yellow", value: null, text: "⦸" },
    { type: "skip", color: "green", value: null, text: "⦸" },
    { type: "skip", color: "blue", value: null, text: "⦸" },
    { type: "skip", color: "wild", value: null, text: "⦸" },
  ].forEach((element) => {
    generateCard(element);
  });
}

function demoWild() {
  clearHand();
  [
    { type: "change", color: "wild", value: null, text: "Wild" },
    { type: "draw", color: "wild", value: "4", text: "+4" },
    { type: "reverse", color: "wild", value: null, text: "⮂" },
    { type: "skip", color: "wild", value: null, text: "⦸" },
  ].forEach((element) => {
    generateCard(element);
  });
}

function demoEntireDeck() {
  clearHand();
  // Puts the entire deck in your hand
  deck.forEach((element) => {
    generateCard(element);
  });
}

//demoRandomFromDeck();
