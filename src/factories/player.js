import Gameboard from "./gameboard";
import Ship from "./ship";

export default class Player {
    constructor(name) {
        this.name = name;
        this.ships = [];
        this.gameBoard = new Gameboard();
        this.turn = false;
    }

    fireShot(player, pos1, pos2) {
        return player.gameBoard.receiveAttack(pos1, pos2);
    }

    isTurn(enemy) {
        this.turn = true;
        enemy.turn = false;
    }

    randomPos() {
        let pos1 = Math.floor(Math.random() * 10);
        let pos2 = Math.floor(Math.random() * 10);
        return [pos1, pos2];
    }

    createFleet() {
        const shipLengthArray = [2, 3, 3, 4, 5];
        for (const length of shipLengthArray) {
            this.ships.push(new Ship(length));
        }
    }

    /*placeShipsRandomly() {
        this.createFleet();
        this.ships.forEach((ship) => {
            this.gameBoard.randomPos
        })
    }*/
}