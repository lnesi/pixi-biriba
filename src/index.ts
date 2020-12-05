import * as PIXI from "pixi.js"
global.PIXI = PIXI;
import "pixi-projection";
//https://pixijs.io/examples/#/plugin-projection/cards.js
const app = new PIXI.Application({ width: 1024, height: 768, backgroundColor: 0x315439 });



const texture = PIXI.Texture.from('examples/assets/bunny.png');

document.body.appendChild(app.view);


class CardSet {
    static CARDS_SETS = ["Clubs", "Diamonds", 'Spades', 'Hearts'];
    static CARDS_VALUES = [
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
    private APP: PIXI.Application;
    constructor(app: PIXI.Application) {
        this.APP = app;
        const l = new PIXI.Loader();
        l.add("sprites/cards.json");
        l.load(this.onLoad.bind(this));
    }
    private onLoad(loader: PIXI.Loader, resources: any) {
        const sheet = resources["sprites/cards.json"];
        console.log(resources);
        for (var j = 0; j < CardSet.CARDS_SETS.length; j++) {
            for (var i = 0; i < CardSet.CARDS_VALUES.length; i++) {
                const card = new PIXI.Sprite(
                    sheet.textures[
                    "card" + CardSet.CARDS_SETS[j] + CardSet.CARDS_VALUES[i] + ".png"
                    ]
                );
                card.x = 50 * i;
                card.y = 100 * j;

                this.APP.stage.addChild(card);
            }
        }
    }
}


new CardSet(app);
