import { createStore, Store, applyMiddleware } from "redux";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const initialState = {
  mase: [],
  table: [],
  players: [
    { uid: null, location: "player1", hand: [] },
    { uid: null, location: "player2", hand: [] },
  ],
  piles: [[], []],
  lastAction: "START",
  currentPlayer: 0, //Local
  currentTurn: 0,
  user: null,
  takenMase: false,
  selectedCards: [[], []],
};

export default class Game extends EventTarget {
  private database: any;
  public store: Store;
  public tableUUID: string = null;
  public currentPlayer = 0;
  constructor(firebase) {
    super();
    this.database = firebase.database();
    this.store = createStore(
      this.reducer.bind(this),
      applyMiddleware(this.firebaseMiddlware.bind(this))
    );
    var cards = [...new CardSet("R").hand, ...new CardSet("B").hand];
    this.store.dispatch({ type: "CREATE_CARDS", payload: cards });
    firebase
      .auth()
      .signInAnonymously()
      .then((data) => {
        this.store.dispatch({ type: "SET_USER", payload: data.user.uid });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  firebaseMiddlware = (storeAPI) => (next) => (action) => {
    console.log("dispatching", action);
    let result = next(action);
    this.database.ref("tables/" + this.tableUUID).set(storeAPI.getState());
    return result;
  };

  reducer(state = initialState, action) {
    let newState = { ...state, lastAction: action.type };

    switch (action.type) {
      case "SET_USER":
        newState = { ...newState, user: action.payload };
        break;
      case "CREATE_TABLE":
        this.tableUUID = uuidv4();
        const ref1 = this.database.ref("tables/" + this.tableUUID);
        ref1.on("value", (snapshot) => {
          this.store.dispatch({
            type: "UPDATE_STATE",
            payload: snapshot.val(),
          });
        });
        break;

      case "UPDATE_STATE":
        newState = { ...action.payload }; //Remote
        break;
      case "DEAL":
        newState = this.deal(newState);
        break;
      case "TAKE_MASE":
        const card = newState.mase.shift();
        newState.takenMase = true;
        card.location = "player" + (this.currentPlayer + 1);
        newState.players[this.currentPlayer].hand.push(card);
        break;
      case "SORT_HAND":
        newState.players[this.currentPlayer].hand = this.sort(
          newState.players[this.currentPlayer].hand
        );
        break;
      case "CREATE_CARDS":
        newState = { ...newState, mase: action.payload };
        break;
      default:
        newState;
    }
    return newState;
  }
  joinTable(tableuuid) {
    this.tableUUID = tableuuid;
    this.currentPlayer = 1;
    const ref2 = this.database.ref("tables/" + this.tableUUID);
    ref2.on("value", (snapshot) => {
      this.store.dispatch({
        type: "UPDATE_STATE",
        payload: snapshot.val(),
      });
    });
  }

  public sort(playerCards) {
    let cards = [];
    cards = playerCards.sort((a, b) => {
      return a.sortValue - b.sortValue;
    });
    console.log(cards);
    return cards;
  }

  deal(state) {
    const newState = {
      ...state,
      table: [],
      players: [
        { uid: null, location: "player1", hand: [] },
        { uid: null, location: "player2", hand: [] },
      ],
      piles: [[], []],
    };
    newState.mase = _.shuffle(newState.mase);
    for (var i = 0; i < 22; i++) {
      var card = newState.mase[0];
      newState.mase.shift();
      if (i % 2) {
        card.location = "player1";
        newState.players[0].hand.push(card);
      } else {
        card.location = "player2";
        newState.players[1].hand.push(card);
      }
    }

    for (var i = 0; i < 22; i++) {
      var card = newState.mase[0];
      newState.mase.shift();
      if (i % 2) {
        card.location = "pile1";
        newState.piles[0].push(card);
      } else {
        card.location = "pile0";
        newState.piles[1].push(card);
      }
    }
    do {
      var card = newState.mase[0];
      card.location = "table";
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
  static SET_VALUE = { D: 20, S: 40, H: 60, C: 80, J: 0 };

  public hand: Array<any>;
  constructor(color: string = "R") {
    this.hand = [];
    for (var j = 0; j < CardSet.SETS.length; j++) {
      for (var i = 0; i < CardSet.VALUES.length; i++) {
        this.hand.push({
          set: CardSet.SETS[j],
          value: CardSet.VALUES[i],
          sortValue: CardSet.VALUES[i] + CardSet.SET_VALUE[CardSet.SETS[j]],
          color: color,
          isJoker: false,
          location: "mase",
        });
      }
    }
    this.hand.push({
      set: "J",
      value: 14,
      color,
      isJoker: true,
      selected: false,
    });
    this.hand.push({
      set: "J",
      value: 14,
      color,
      isJoker: true,
      selected: false,
    });
  }
}
