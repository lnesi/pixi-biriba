
import * as PIXI from "pixi.js"
import Game from "./Game";
import CardGroup from './CardGroup'
import Card from "./Card";



class CardsContainer extends PIXI.Container {
    public cards: CardGroup
    private xOffset: number;
    private xInit: number;
    private yOffset: number;
    private yInit: number;
    constructor(cards, xInit: number, xOffset: number, yInit: number, yOffset: number) {
        super();
        this.interactive = true;
        this.cards = cards;
        this.xInit = xInit;
        this.xOffset = xOffset
        this.yInit = yInit;
        this.yOffset = yOffset

    }
    removeAll() {
        for (var i = 0; i < this.children.length; i = 0) {
            this.removeChildAt(0)
        }
    }

    renderAll() {
        for (var i = 0; i < this.cards.hand.length; i++) {
            this.cards.hand[i].moveTo(this.xInit + (this.xOffset * i), this.yInit + (this.yOffset * i), 10 * i);
            this.addChild(this.cards.hand[i].Object);
        }
    }
}


class Player extends CardsContainer {
    public cards: CardGroup

    public name: string

    constructor(name: string, cards: CardGroup, yInit: number, yOffset: number) {
        super(cards, 100, 25, yInit, yOffset);
        this.name = name;


    }

}

export default class GameScene {
    private APP: PIXI.Application;
    public Mase: CardsContainer;
    public Table: CardsContainer;
    public Player01: Player;
    public Player02: Player;
    public game: Game;

    constructor(app: PIXI.Application, game: Game) {
        this.APP = app;
        this.game = game;
        this.Mase = new CardsContainer(this.game.Mase, 100, 3, 320, 0)
        this.Table = new CardsContainer(this.game.Table, 500, 20, 320, 0)
        this.Player01 = new Player('player01', this.game.Player01, 650, 0);
        this.Player02 = new Player('player02', this.game.Player02, 10, 0);
        this.APP.stage.addChild(this.Mase);
        this.APP.stage.addChild(this.Table);
        this.APP.stage.addChild(this.Player01);
        this.APP.stage.addChild(this.Player02);

        this.Mase.addListener('click', () => {
            this.game.takeFromMase();
        });
        this.game.addEventListener('CARD_TAKEN_MASE', (e: any) => {

            e.detail.player.hand.push(e.detail.card);
            this.removeAll();
            this.renderAll();

        })
        this.renderAll();
        // Add Card Pile


    }
    private removeAll() {
        this.Mase.removeAll();
        this.Table.removeAll();
        this.Player01.removeAll();
        this.Player02.removeAll();
    }
    private renderAll() {
        this.Mase.renderAll();
        this.Table.renderAll();
        this.Player01.renderAll();
        this.Player02.renderAll();
    }



}