import Player from "../player";
import Gameboard from "../gameboard";

const player = new Player("human");
const enemy = new Player("computer");
const playerBoard = Gameboard();
const enemyBoard = Gameboard();

describe("Types", () => {
    test("human type", () => {
        const actual = player.getType();
        expect(actual).toBe("human");
    })
    test("computer type", () => {
        const actual = enemy.getType();
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

