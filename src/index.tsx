import Game from "./com/lndev/biriba/Game";
import React, { useState } from "react";
import { render } from "react-dom";
import Interface from "./components/Interface";
import firebase from "./com/lndev/biriba/Firebase";
import { Provider } from "react-redux";

export const GameContext = React.createContext();

const game = new Game(firebase);
document["game"] = game;
render(
  <GameContext.Provider value={game}>
    <Provider store={game.store}>
      <Interface />
    </Provider>
  </GameContext.Provider>,
  document.getElementById("root")
);
