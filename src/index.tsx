import Game from "./com/lndev/biriba/Game";
import React, { useState } from "react";
import { render } from "react-dom";
import Interface from "./components/Interface";
import firebase from "./com/lndev/biriba/Firebase";
import { Provider } from "react-redux";
const game = new Game(firebase);

render(
  <Provider store={game.store}>
    <Interface />
  </Provider>,
  document.getElementById("root")
);
