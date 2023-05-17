import Gameboard from "./factories/gameboard";
import { renderBoards } from "./DOM/renderFunction";

const gameboard = new Gameboard("Player");

const container = document.getElementById("playerBoard");

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => renderBoards())
