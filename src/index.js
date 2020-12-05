console.log("text game");
const util = require("util");
class Card {
  constructor(set, value, color, joker = false) {
    this.value = value;
    this.set = set;
    this.joker = joker;
    this.color = color;
  }
}

class Cards {
  constructor(color = "R") {
    this.COLOR = ["R", "B"];
    this.SETS = ["C", "D", "S", "H"];
    this.VALUES = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.cards = [];
    for (var j = 0; j < this.SETS.length; j++) {
      for (var i = 0; i < this.VALUES.length; i++) {
        this.cards.push(new Card(this.SETS[j], this.VALUES[i], color));
      }
    }
    this.cards.push(new Card("J", 14, color, true));
    this.cards.push(new Card("J", 14, color, true));
  }
}

class Game {
  constructor() {
    this.Mase = new CardGroup([
      ...new Cards("R").cards,
      ...new Cards("B").cards,
    ]);
    this.Player01 = new Player();
    this.Player02 = new Player();
    this.Pile01 = new CardGroup();
    this.Pile02 = new CardGroup();
    this.Table = new CardGroup();
  }
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  deal() {
    for (var i = 0; i < 22; i++) {
      if (i % 2) {
        this.Player01.add(this.Mase.take());
      } else {
        this.Player02.push(this.Mase.take());
      }
    }
    for (var i = 0; i < 22; i++) {
      if (i % 2) {
        this.Pile01.add(this.Mase.take());
      } else {
        this.Pile02.add(this.Mase.take());
      }
    }
    this.Table.add(this.Mase.take());
    this.Player01.sort();
    this.Player02.sort();
    this.Pile01.sort();
    this.Pile02.sort();
  }
}

class CardGroup {
  constructor(hand = []) {
    this.hand = hand;
  }
  get(index) {
    return this.hand[index];
  }
  push(card) {
    this.hand.push(card);
  }
  take(index = 0) {
    var card = this.hand[index];
    if (index === 0) {
      this.hand.shift();
    } else {
      this.hand.slice(index, index + 1);
    }
    return card;
  }
  shuffle() {
    var currentIndex = this.hand.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.hand[currentIndex];
      this.hand[currentIndex] = this.hand[randomIndex];
      this.hand[randomIndex] = temporaryValue;
    }

    return this.hand;
  }
  sort() {
    this.hand = this.hand.sort((a, b) => {
      var setal = { D: 20, S: 40, H: 60, C: 80, J: 0 };
      return a.value + setal[a.set] - (b.value + setal[b.set]);
    });
  }

  add(card) {
    this.hand.push(card);
  }
}
class Player extends CardGroup {
  constructor() {
    super();
  }
}

const game = new Game();

game.Mase.shuffle();
game.deal();

console.log(util.inspect(game, false, null, true /* enable colors */));
