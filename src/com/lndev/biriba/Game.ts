import Cards from './Cards';
import CardGroup from './CardGroup';

export default class Game {
    public Mase: CardGroup;
    public Table: CardGroup;
    public Player01: CardGroup;
    public Player02: CardGroup;
    public Pile01: CardGroup;
    public Pile02: CardGroup;
    constructor() {
        this.Table = new CardGroup();
        this.Mase = new CardGroup([
            ...new Cards("R").hand,
            ...new Cards("B").hand,
        ]);
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

}