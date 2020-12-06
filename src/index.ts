import * as PIXI from "pixi.js"
global.PIXI = PIXI;
import "pixi-projection";
//https://pixijs.io/examples/#/plugin-projection/cards.js

const app = new PIXI.Application({ width: 1024, height: 768, backgroundColor: 0x315439 });

import Game from './com/lndev/biriba/Game';
import CardGroup from "./com/lndev/biriba/CardGroup";

const game = new Game();

document.body.appendChild(app.view);
let sheet = null
const loader = new PIXI.Loader();
loader.add("sprites/cards.json");
loader.load(loadHandler);
function loadHandler(loader: PIXI.Loader, resources: any) {
    sheet = resources["sprites/cards.json"];
    game.createCards(sheet);
    game.deal();
    console.log(game)
    new CardTableView(app);

}
class CardTableView {
    private APP: PIXI.Application;
    private Mase: PIXI.Container;
    private Table: PIXI.Container;
    private Player01: PIXI.Container;
    private Player02: PIXI.Container;

    constructor(app: PIXI.Application) {
        this.APP = app;
        this.Mase = new PIXI.Container();
        this.Table = new PIXI.Container();
        this.Player01 = new PIXI.Container();
        this.Player02 = new PIXI.Container();
        this.APP.stage.addChild(this.Mase);
        this.APP.stage.addChild(this.Table);
        this.APP.stage.addChild(this.Player01);
        this.APP.stage.addChild(this.Player02);

        // Add Card Pile
        this.renderMase();
        this.renderTable();
        this.renderPlayer(game.Player01, 500, this.Player01);
        this.renderPlayer(game.Player02, 10, this.Player02);

    }

    public renderPlayer(player: CardGroup, y: number, container: PIXI.Container) {
        for (var i = 0; i < player.hand.length; i++) {
            player.hand[i].Object.x = 100 + (50 * i);
            player.hand[i].Object.y = y;
            player.hand[i].faceUp();
            container.addChild(player.hand[i].Object);
        }
    }
    public renderTable() {

        for (var i = 0; i < game.Table.hand.length; i++) {
            game.Table.hand[i].Object.x = 500 + (50 * i);
            game.Table.hand[i].Object.y = 250;
            game.Table.hand[i].faceUp();
            this.Table.addChild(game.Table.hand[i].Object);
        }
    }
    public renderMase() {

        for (var i = 0; i < game.Mase.hand.length; i++) {
            game.Mase.hand[i].Object.x = 100 + (3 * i);
            game.Mase.hand[i].Object.y = 250;
            game.Mase.hand[i].faceDown();
            this.Mase.addChild(game.Mase.hand[i].Object);
        }

    }

}



