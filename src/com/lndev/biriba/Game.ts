
import CardGroup from './CardGroup';
import Card from './Card';
import { createStore, Store } from 'redux'
import _ from 'lodash';

export default class Game extends EventTarget {
    private database: any
    public store: Store
        
    constructor(database) {
        super();
        this.database = database;
        this.store = createStore(this.reducer.bind(this))
        var cards = [
            ...new CardSet("R").hand,
            ...new CardSet("B").hand,
        ]
        this.store.dispatch({ type: 'CREATE_CARDS', payload: cards });
        this.store.dispatch({ type: 'DEAL' });
    }

    reducer(state = { mase: [], table: [], players: [], piles: [], lastAction: 'START', currentPlayer: 0 }, action) {
        console.log(action, state)
        let newState = { ...state, lastAction: action.type };

        switch (action.type) {
            case 'DEAL':
                newState = this.deal(newState);
                break;
            case 'CREATE_CARDS':
                newState = { ...newState, mase: action.payload }
                break;
            default:
                newState;
        }
        this.database.ref('tables/' + "uuid-table").set({
            ...newState
        })
        return newState
    }

    deal(state) {
        const newState = { ...state, players: [[], []], piles: [[], []], table: [] };
        newState.mase = _.shuffle(newState.mase);
        //shuffle
        for (var i = 0; i < 22; i++) {
            var card = newState.mase[0];
            newState.mase.shift();
            if (i % 2) {
                newState.players[0].push(card);
            } else {
                newState.players[1].push(card);
            }
        }

        for (var i = 0; i < 22; i++) {
            var card = newState.mase[0];
            newState.mase.shift();
            if (i % 2) {
                newState.piles[0].push(card);
            } else {
                newState.piles[1].push(card);
            }
        }
        do {
            var card = newState.mase[0];
            newState.mase.shift();
            newState.table.push(card);
        } while (newState.table[0].isJocker)
        return newState;

    }
}
// export class GameOld extends EventTarget {
//     public Mase: CardGroup;
//     public Table: CardGroup;
//     public Player01: CardGroup;
//     public Player02: CardGroup;
//     public Pile01: CardGroup;
//     public Pile02: CardGroup;
//     public currentPlayer: number = 0;
//     public tookedFromMase: boolean = false
//     private database: any
//     constructor(database) {
//         super();
//         this.Table = new CardGroup();
//         this.Mase = new CardGroup();
//         this.Player01 = new CardGroup();
//         this.Player02 = new CardGroup();
//         this.Pile01 = new CardGroup();
//         this.Pile02 = new CardGroup();
//         this.database = database;
//         this.database.ref('tables/' + "uuid-table").set({
//             "mase": [1],
//             "table": [1]
//         }).then(() => { console.log('set') });

//     }

//     public deal() {
//         this.Mase.shuffle();
//         for (var i = 0; i < 22; i++) {
//             if (i % 2) {
//                 this.Player01.hand.push(this.Mase.take());
//             } else {
//                 this.Player02.hand.push(this.Mase.take());
//             }
//         }
//         for (var i = 0; i < 22; i++) {
//             if (i % 2) {
//                 this.Pile01.hand.push(this.Mase.take());
//             } else {
//                 this.Pile02.hand.push(this.Mase.take());
//             }
//         }
//         do {
//             this.Table.hand.push(this.Mase.take());
//         } while (this.Table.hand[0].isJocker)
//         this.Player01.sort();
//         this.Player02.sort();
//         this.Pile01.sort();
//         this.Pile02.sort();

//     }
//     public createCards(sheet: PIXI.LoaderResource) {
//         var cards = [
//             ...new Cards("R", sheet).hand,
//             ...new Cards("B", sheet).hand,
//         ]
//         this.Mase.hand = (cards);
//         this.database.ref('tables/' + "uuid-table").set({
//             "mase": cards = [
//                 ...new CardsV2("R").hand,
//                 ...new CardsV2("B").hand,
//             ],
//         }).then(() => { console.log('set2') });
//     }
//     public takeFromMase() {
//         // if (!this.tookedFromMase) {
//         const card = this.Mase.hand.pop();
//         this.tookedFromMase = true

//         this.dispatchEvent(new CustomEvent('CARD_TAKEN_MASE', { detail: { card, player: this.Player01 } }));
//         // }

//     }

// }


class CardSet {
    static COLORS = ["R", "B", "G"];
    static SETS = ["C", "D", "S", "H"];

    static VALUES = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    public hand: Array<any>
    constructor(color: string = "R") {
        this.hand = [];
        for (var j = 0; j < CardSet.SETS.length; j++) {
            for (var i = 0; i < CardSet.VALUES.length; i++) {
                this.hand.push({ set: CardSet.SETS[j], value: CardSet.VALUES[i], color: color, isJoker: false });
            }
        }
        this.hand.push({ set: "J", value: 14, color, isJoker: true });
        this.hand.push({ set: "J", value: 14, color, isJoker: true });

    }

}
