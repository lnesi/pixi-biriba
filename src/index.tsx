import * as PIXI from "pixi.js"
global.PIXI = PIXI;
import "pixi-projection";
//https://pixijs.io/examples/#/plugin-projection/cards.js
import Game from './com/lndev/biriba/Game';
import GameScene from './com/lndev/biriba/GameScene'
import CardGroup from "./com/lndev/biriba/CardGroup";

import React, { useState } from "react";
import { render } from "react-dom";
import Interface from './components/Interface';

const app = new PIXI.Application({ width: 1024, height: 768, backgroundColor: 0x315439 });
document.getElementById('canvas').appendChild(app.view);

const game = new Game();

let sheet = null
const loader = new PIXI.Loader();
loader.add("sprites/cards.json");
loader.load(loadHandler);
function loadHandler(loader: PIXI.Loader, resources: any) {
    sheet = resources["sprites/cards.json"];
    game.createCards(sheet);
    game.deal();
    const pixi=new GameScene(app, game);

    render(<Interface pixi={pixi}/>, document.getElementById("root"));
}




