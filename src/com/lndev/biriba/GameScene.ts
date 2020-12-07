
import * as PIXI from "pixi.js"
import Game from "./Game";
import CardGroup from './CardGroup'
import Card from "./Card";

export default class GameScene {
    private APP: PIXI.Application;
    public Mase: CardContainer;
    public Table: CardContainer;
    public Player01: PIXI.Container;
    public Player02: PIXI.Container;
    public game: Game;

    constructor(app: PIXI.Application, game: Game) {
        this.APP = app;
        this.game = game;
        this.Mase = new CardContainer(this, this.game.Mase, 100, 3, 250, 0)
        this.Table = new CardContainer(this, this.game.Table, 500, 20, 250, 0)
        this.Player01 = new PIXI.Container();
        this.Player02 = new PIXI.Container();
        this.APP.stage.addChild(this.Mase);
        this.APP.stage.addChild(this.Table);
        this.APP.stage.addChild(this.Player01);
        this.APP.stage.addChild(this.Player02);

        this.Mase.addListener('click', () => {
            this.game.takeFromMase();
        });
        this.game.addEventListener('CARD_TAKEN_MASE', (e) => {
            this.Mase.removeAll();
            this.Mase.renderAll();
            this.Table.removeAll();
            this.Table.renderAll();
        })

        // Add Card Pile
        this.Mase.renderAll();
        this.Table.renderAll();
        this.renderPlayer(game.Player01, 500, this.Player01);
        this.renderPlayer(game.Player02, 10, this.Player02);

    }

    public renderPlayer(player: CardGroup, y: number, container: PIXI.Container) {
        for (var i = 0; i < player.hand.length; i++) {
            player.hand[i].faceUp();
            player.hand[i].moveTo(100 + (50 * i), y, 20 * i);
            container.addChild(player.hand[i].Object);
        }
    }

}


class CardContainer extends PIXI.Container {
    private scene: GameScene;
    private cards: CardGroup;
    private xInit: number;
    private xOffset: number;
    private yInit: number;
    private yOffset: number;
    constructor(scene: GameScene, cards: CardGroup, xInit: number, xOffset: number, yInit: number, yOffset: number) {
        super();
        this.cards = cards;
        this.xInit = xInit
        this.xOffset = xOffset
        this.yInit = yInit
        this.yOffset = yOffset
        this.scene = scene;
        this.interactive = true;

    }

    onClick(e) {
        this.scene.game.takeFromMase();
        // this.removeAll();
        // this.renderAll();
        // this.scene.Table.removeAll();
        // this.scene.Table.renderAll();
    }
    removeAll() {
        for (var i = 0; i < this.children.length; i = 0) {
            this.removeChildAt(0)
        }
    }
    renderAll() {
        for (var i = 0; i < this.cards.hand.length; i++) {
            // this.scene.game.Mase.hand[i].faceDown();
            this.cards.hand[i].moveTo(this.xInit + (this.xOffset * i), this.yInit + (this.yOffset * i), 10 * i);
            this.addChild(this.cards.hand[i].Object);
        }

    }
}
