import { v4 as uuidv4 } from "uuid";
const initialState = {
  mase: [],
  table: [],
  players: [[], []],
  piles: [[], []],
  lastAction: "START",
  currentPlayer: 0, //Local
  currentTurn: 0,
  user: null,
};
export default function biribaReducer(state = initialState, action) {
  console.log(action);
  let write = true;
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
      newState = { ...action.payload, currentPlayer: 1 }; //Remote
      break;
    case "DEAL":
      newState = this.deal(newState);
      break;
    case "CREATE_CARDS":
      newState = { ...newState, mase: action.payload };
      break;
    default:
      newState;
  }
  if (write) {
    this.database.ref("tables/" + this.tableUUID).set({
      ...newState,
    });
  }

  return newState;
}
