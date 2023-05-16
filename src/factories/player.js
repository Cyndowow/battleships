import Gameboard from "./gameboard";

export default class Player {
    constructor(name) {
        this.name = name;
        this.ships = [];
        this.gameBoard = new Gameboard();
    }

    fireShot(location, gameboard) {
        if (gameboard.opponentBoard()[location] === "empty") {
            gameboard.receiveAttack(location);
        }
    }
}