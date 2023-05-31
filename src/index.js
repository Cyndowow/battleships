import Gameboard from "./factories/gameboard";
import { renderBoards, initHeaderButtons } from "./DOM/renderFunction";
import { initGame } from "./DOM/game";


initGame();
initHeaderButtons();

//window.addEventListener("DOMContentLoaded", () => initGame(), initHeaderButtons());

//startButton.addEventListener("click", () => renderBoards())
