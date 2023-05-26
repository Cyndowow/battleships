import Gameboard from "./gameboard";
import Ship from "./ship";

export default class Player {
    constructor(name) {
        this.name = name;
//        this.ships = [];
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

    getTurn() {
        return this.turn;
    }

    setTurn(value) {
        this.turn = value;
    }

    randomPos() {
        let pos1 = Math.floor(Math.random() * 10);
        let pos2 = Math.floor(Math.random() * 10);
        return [pos1, pos2];
    }

    /*createFleet() {
        this.ships = [];
        const shipLengthArray = [1, 2, 3, 4, 5]; //[2, 3, 3, 4, 5]
        for (const length of shipLengthArray) {
            this.ships.push(new Ship(length));
        }
    }*/

    placeShipRandomly(length) {

        let pos1 = Math.floor(Math.random() * 10);
        let pos2 = Math.floor(Math.random() * 10);
        let dir = Math.round(Math.random());

        if (dir === 0) {
            dir = "h";
            if (this.gameBoard.placeShip(pos1, pos2, length, dir) === false) return false;
        }

        if (dir === 1) {
            dir = "v";
            if (this.gameBoard.placeShip(pos1, pos2, length, dir) === false) return false;
        }
    }

    placeRandomFleet() {
            for (let i = 0; i < 1; ) {
              if (this.placeShipRandomly(1) == false) continue;
              i++;
            }
            for (let i = 0; i < 1; ) {
              if (this.placeShipRandomly(2) == false) continue;
              i++;
            }
            for (let i = 0; i < 1; ) {
              if (this.placeShipRandomly(3) == false) continue;
              i++;
            }
            for (let i = 0; i < 1; ) {
              if (this.placeShipRandomly(4) == false) continue;
              i++;
            }
            for (let i = 0; i < 1; ) {
                if (this.placeShipRandomly(5) == false) continue;
                i++;
              }
        this.gameBoard.setStartAllowed(true);
    }
}