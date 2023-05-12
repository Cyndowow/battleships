import Player from "../player";
import Gameboard from "../gameboard";
import Ship from "../ship";

const player = new Player("human");
const enemy = new Player("computer");
const playerBoard = Gameboard();
const enemyBoard = Gameboard();
const submarine = new Ship("submarine");
playerBoard.placeShip(submarine, 2, 0);

describe("Types", () => {
    test("name: human", () => {
        const actual = player.getName();
        expect(actual).toBe("human");
    })
    test("name: computer", () => {
        const actual = enemy.getName();
        expect(actual).toBe("computer");
    })
})

describe("Player attack", () => {
    test("attack enemy board", () => {
        player.attack(2, 3, enemyBoard);
        const actual = enemyBoard.getBoard()[2][3];
        expect(actual).toBe("miss");
    })
})

describe("Auto attack", () => {
    test("enemy auto attack player board", () => {
        enemy.autoAttack(playerBoard); 
        const actual = playerBoard.getBoard().flat().every((cell) => cell === null);
        expect(actual).toBe(false);
    })
})

