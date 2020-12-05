import * as PIXI from "pixi.js";

const app = new PIXI.Application({ width: 1024, height: 768 });

document.body.appendChild(app.view);

class CardSet {
  constructor(app) {
    this.CARDS_SETS = ["Clubs", "Diamonds", "Spades", "Hearts"];
    this.CARDS_VALUES = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    this.App = app;
    const l = new PIXI.Loader();
    l.add("sprites/cards.json");
    l.load(this.onLoad.bind(this));
  }
  onLoad(loader, resources) {
    const sheet = resources["sprites/cards.json"];
    console.log(resources);
    for (var j = 0; j < this.CARDS_SETS.length; j++) {
      for (var i = 0; i < this.CARDS_VALUES.length; i++) {
        const card = new PIXI.Sprite(
          sheet.textures[
            "card" + this.CARDS_SETS[j] + this.CARDS_VALUES[i] + ".png"
          ]
        );
        card.x = 50 * i;
        card.y = 100 * j;
        this.App.stage.addChild(card);
      }
    }
  }
}

new CardSet(app);
