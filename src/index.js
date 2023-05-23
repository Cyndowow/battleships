import Gameboard from "./factories/gameboard";
import { renderBoards } from "./DOM/renderFunction";
import { initGame } from "./DOM/game";


const startButton = document.getElementById("start");


startButton.addEventListener("click", () => initGame());

//startButton.addEventListener("click", () => renderBoards())
