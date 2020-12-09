
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
    public removeAll() {
        for (var i = 0; i < this.children.length; i = 0) {
            this.removeChildAt(0)
        }
    }

    public renderAll() {
        for (var i = 0; i < this.cards.hand.length; i++) {
            this.cards.hand[i].moveTo(this.xInit + (this.xOffset * i), this.yInit + (this.yOffset * i), 10 * i);
            this.addChild(this.cards.hand[i].Object);
        }
    }

}


class Player extends CardsContainer {
    public name: string
    public selectedCards: CardGroup;
    constructor(name: string, cards: CardGroup, yInit: number, yOffset: number) {
        super(cards, 100, 25, yInit, yOffset);
        this.selectedCards = new CardGroup();
        this.name = name;
        this.addListener('CARD_CLICK', this.onCardClick.bind(this))
    }
    private onCardClick(card) {
        card.select()
    }
    public renderAll() {
        super.renderAll();
        this.cards.unselectAll();
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

        this.Mase.addListener('CARD_CLICK', () => {
            this.game.takeFromMase();

        });

        this.Table.addListener('CARD_CLICK', (card: Card) => {
            this.Player01.cards.hand = [...this.Player01.cards.hand, ...this.Table.cards.hand]
            this.Player01.cards.sort();
            this.Table.cards.hand = [];
            this.removeAll();
            this.renderAll();
        });
        window.addEventListener("CLICK_DISCARD", () => {

            if (this.Player01.selectedCards.hand.length === 0) {
                alert("Select a card to discard");
            } else if (this.Player01.selectedCards.hand.length === 1) {
                this.Player01.cards.discard(this.Player01.selectedCards.hand[0]);
                this.Table.cards.hand.push(this.Player01.selectedCards.hand[0])
                this.Player01.selectedCards.hand=[];
                this.removeAll();
                this.renderAll();
            } else {
                alert("Only one card can be discarded");
            }
        })
        this.Player01.addListener('CARD_CLICK', (card: Card) => {
            //console.log(card)
            this.Player01.selectedCards.hand.push(card);
        });

        this.game.addEventListener('CARD_TAKEN_MASE', (e: any) => {
            e.detail.player.hand.push(e.detail.card);
            e.detail.player.sort();
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
        this.Mase.cards.faceDownAll();
        this.Mase.cards.hand[this.Mase.cards.hand.length - 1].faceUp();
        this.Mase.renderAll();
        this.Table.renderAll();
        this.Player01.renderAll();
        this.Player02.renderAll();
    }



}