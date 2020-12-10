import { createStore, Store } from "redux";
import _ from "lodash";

export default class Game extends EventTarget {
  private database: any;
  public store: Store;

  constructor(firebase) {
    super();
    this.database = firebase.database();
    this.store = createStore(this.reducer.bind(this));
    var cards = [...new CardSet("R").hand, ...new CardSet("B").hand];
    this.store.dispatch({ type: "CREATE_CARDS", payload: cards });
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("loggedin");
        this.store.dispatch({ type: "DEAL" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  reducer(
    state = {
      mase: [],
      table: [],
      players: [[], []],
      piles: [[], []],
      lastAction: "START",
      currentPlayer: 0,
    },
    action
  ) {
    console.log(action, state);
    let newState = { ...state, lastAction: action.type };

    switch (action.type) {
      case "DEAL":
        newState = this.deal(newState);
        break;
      case "CREATE_CARDS":
        newState = { ...newState, mase: action.payload };
        break;
      default:
        newState;
    }
    this.database.ref("tables/" + "uuid-table").set({
      ...newState,
    });
    return newState;
  }

  deal(state) {
    const newState = {
      ...state,
      players: [[], []],
      piles: [[], []],
      table: [],
    };
    newState.mase = _.shuffle(newState.mase);
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
    } while (newState.table[0].isJocker);
    return newState;
  }
}

class CardSet {
  static COLORS = ["R", "B", "G"];
  static SETS = ["C", "D", "S", "H"];

  static VALUES = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  public hand: Array<any>;
  constructor(color: string = "R") {
    this.hand = [];
    for (var j = 0; j < CardSet.SETS.length; j++) {
      for (var i = 0; i < CardSet.VALUES.length; i++) {
        this.hand.push({
          set: CardSet.SETS[j],
          value: CardSet.VALUES[i],
          color: color,
          isJoker: false,
        });
      }
    }
    this.hand.push({ set: "J", value: 14, color, isJoker: true });
    this.hand.push({ set: "J", value: 14, color, isJoker: true });
  }
}
