import Cards from './Cards';
import CardGroup from './CardGroup';
import Card from './Card';

export default class Game extends EventTarget {
    public Mase: CardGroup;
    public Table: CardGroup;
    public Player01: CardGroup;
    public Player02: CardGroup;
    public Pile01: CardGroup;
    public Pile02: CardGroup;
    public currentPlayer: number = 0;
    public tookedFromMase: boolean = false
    constructor() {
        super();
        this.Table = new CardGroup();
        this.Mase = new CardGroup();
        this.Player01 = new CardGroup();
        this.Player02 = new CardGroup();
        this.Pile01 = new CardGroup();
        this.Pile02 = new CardGroup();
    }

    public deal() {
        this.Mase.shuffle();
        for (var i = 0; i < 22; i++) {
            if (i % 2) {
                this.Player01.hand.push(this.Mase.take());
            } else {
                this.Player02.hand.push(this.Mase.take());
            }
        }
        for (var i = 0; i < 22; i++) {
            if (i % 2) {
                this.Pile01.hand.push(this.Mase.take());
            } else {
                this.Pile02.hand.push(this.Mase.take());
            }
        }
        do {
            this.Table.hand.push(this.Mase.take());
        } while (this.Table.hand[0].isJocker)
        this.Player01.sort();
        this.Player02.sort();
        this.Pile01.sort();
        this.Pile02.sort();

    }
    public createCards(sheet: PIXI.LoaderResource) {
        this.Mase.hand = ([
            ...new Cards("R", sheet).hand,
            ...new Cards("B", sheet).hand,
        ]);
    }
    public takeFromMase() {
        // if (!this.tookedFromMase) {
        const card = this.Mase.hand.pop();
        this.tookedFromMase = true
        if (this.currentPlayer === 0) {
            this.Table.hand.push(card);
        }
        this.dispatchEvent(new CustomEvent('CARD_TAKEN_MASE', { detail: card }));
        // }

    }

}