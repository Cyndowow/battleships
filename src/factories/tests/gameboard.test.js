import Ship from "../ship";
import Gameboard from "../gameboard";

describe("Gameboard", () => {
    describe("board", () => {
        const gameboard = Gameboard();
        test("empty board", () => {
            const actual = gameboard.getBoard().every((square) => square === null);
            const expected = false;
            expect(actual).toBe(expected);
        })
        test("board row", () => {
            const actual = gameboard.getBoard().length;
            const expected = 10;
            expect(actual).toBe(expected);
        })
        test("board column", () => {
            const actual = gameboard.getBoard()[0].length;
            const expected = 10;
            expect(actual).toBe(expected);
        })
    })

    describe("place horizontal ship", () => {
        const gameboard = Gameboard();
        const ship = new Ship("cruiser");
        gameboard.placeShip(ship, 3, 2);

        test("placed ship is at starter coord with index 0", () => {
            const actual = gameboard.getBoard()[3][2];
            expect(actual).toEqual({ ship, index: 0})
        })
        test("placed ship is at starter coord with index 1", () => {
            const actual = gameboard.getBoard()[3][3];
            expect(actual).toEqual({ ship, index: 1})
        })
        test("placed ship is at starter coord with index 2", () => {
            const actual = gameboard.getBoard()[3][4];
            expect(actual).toEqual({ ship, index: 2})
        })
    })
    
    describe("place vertical ship", () => {
        const gameboard = Gameboard();
        const ship = new Ship("submarine");
        ship.changeDirection();
        gameboard.placeShip(ship, 3, 2);

        test("placed ship at starter coords with index 0", () => {
            const actual = gameboard.getBoard()[3][2];
            expect(actual).toEqual({ship, index: 0});
        })
        test("placed ship at starter coords with index 1", () => {
            const actual = gameboard.getBoard()[4][2];
            expect(actual).toEqual({ship, index: 1});
        })
        test("placed ship at starter coords with index 2", () => {
            const actual = gameboard.getBoard()[5][2];
            expect(actual).toEqual({ship, index: 2});
        })
    })
}) 