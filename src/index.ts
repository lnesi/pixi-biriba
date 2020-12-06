import * as PIXI from "pixi.js"
global.PIXI = PIXI;
import "pixi-projection";
//https://pixijs.io/examples/#/plugin-projection/cards.js

const app = new PIXI.Application({ width: 1024, height: 768, backgroundColor: 0x315439 });

import Game from './com/lndev/biriba/Game';

//const setcards = new Cards();
const game = new Game();
game.deal();
console.log(game)
document.body.appendChild(app.view);
let sheet = null
const loader = new PIXI.Loader();
loader.add("sprites/cards.json");
loader.load(loadHandler);
function loadHandler(loader: PIXI.Loader, resources: any) {
    sheet = resources["sprites/cards.json"];
    new CardSet(app);
}
class CardSet {
    private APP: PIXI.Application;
    constructor(app: PIXI.Application) {
        this.APP = app;
        // Add Card Pile
        for (var i = 0; i < game.Table.hand.length; i++) {
            const card = new PIXI.Sprite(
                sheet.textures[
                "card" + game.Table.hand[i].set + game.Table.hand[i].value + ".png"
                ]
            );
            card.x = 500 + (50 * i);
            card.y = 250;
            this.APP.stage.addChild(card);
        }
        for (var i = 0; i < game.Player01.hand.length; i++) {
            const card = new PIXI.Sprite(
                sheet.textures[
                "card" + game.Player01.hand[i].set + game.Player01.hand[i].value + ".png"
                ]
            );
            card.x = 100 + (50 * i);
            card.y = 500;
            this.APP.stage.addChild(card);
        }
        for (var i = 0; i < game.Player02.hand.length; i++) {
            const card = new PIXI.Sprite(
                sheet.textures[
                "card" + game.Player01.hand[i].set + game.Player01.hand[i].value + ".png"
                ]
            );
            card.x = 100 + (50 * i);
            card.y = 10;
            this.APP.stage.addChild(card);
        }
        for (var i = 0; i < game.Mase.hand.length; i++) {
            const card = new PIXI.Sprite(
                sheet.textures[
                "cardBackColor" + game.Mase.hand[i].color + ".png"
                ]
            );
            card.x = 100 + (3 * i);
            card.y = 250;
            this.APP.stage.addChild(card);
        }


    }
    // private onLoad(loader: PIXI.Loader, resources: any) {
    //     const sheet = resources["sprites/cards.json"];
    //     console.log(resources);
    //     for (var j = 0; j < Cards.SETS.length; j++) {
    //         for (var i = 0; i < Cards.VALUES.length; i++) {
    //             const card = new PIXI.Sprite(
    //                 sheet.textures[
    //                 "card" + Cards.SETS[j] + Cards.VALUES[i] + ".png"
    //                 ]
    //             );
    //             card.x = 50 * i;
    //             card.y = 100 * j;

    //             this.APP.stage.addChild(card);
    //         }
    //     }
    // }
}



