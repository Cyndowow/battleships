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

    describe("dont place ships out of bounds", () => {
        const gameboard = Gameboard();
        const carrier = new Ship("carrier");

        test("out of bounds ship horizontal", () => {
            gameboard.placeShip(carrier, 7, 7);
            const actual = gameboard.getBoard()[7][7];
            expect(actual).toEqual(null);
        })
        test("out of bounds ship vertical", () => {
            carrier.changeDirection();
            gameboard.placeShip(carrier, 7, 7);
            const actual = gameboard.getBoard()[7][7];
            expect(actual).toEqual(null);
        })
    })

    describe("all ships placed", () => {
        const gameboard = Gameboard();
        const carrier = new Ship("carrier");
        const battleship = new Ship("battleship");
        const cruiser = new Ship("cruiser");
        const submarine = new Ship("submarine");
        const destroyer = new Ship("destroyer");

        test("no ships placed", () => {
            const actual = gameboard.areAllShipsPlaced();
            expect(actual).toBe(false);
        })
        test("some ships placed", () => {
            gameboard.placeShip(carrier, 0, 0);
            gameboard.placeShip(battleship, 1, 0);
            const actual = gameboard.areAllShipsPlaced();
            expect(actual).toBe(false);
        })
        test("all ships placed", () => {
            gameboard.placeShip(cruiser, 2, 0);
            gameboard.placeShip(submarine, 3, 0);
            gameboard.placeShip(destroyer, 4, 0);
            const actual = gameboard.areAllShipsPlaced();
            expect(actual).toBe(true);
        })
    })

    describe("receive attack", () => {
        const gameboard = Gameboard();
        const carrier = new Ship("carrier");
        const battleship = new Ship("battleship");
        gameboard.placeShip(carrier, 2, 0);
        battleship.changeDirection();
        gameboard.placeShip(battleship, 3, 2);
        gameboard.receiveAttack(0, 0);

        test("attack carrier at index 0", () => {
            gameboard.receiveAttack(2, 0);
            const actual = carrier.getHits();
            expect(actual).toEqual(["hit", null, null, null, null]);
        })
        test("attack carrier at index 3", () => {
            gameboard.receiveAttack(2, 3);
            const actual = carrier.getHits();
            expect(actual).toEqual(["hit", null, null, "hit", null]);
        })
        test("miss", () => {
            const actual = gameboard.getBoard()[0][0];
            expect(actual).toBe("miss");
        })
        test("hit at cell (2, 0", () => {
            const actual = gameboard.getBoard()[2][0];
            expect(actual).toEqual("hit");
        })
        test("miss at cell 4, 0", () => {
            gameboard.receiveAttack(4, 0);
            const actual = gameboard.getBoard()[4][0];
            expect(actual).toBe("miss");
        })
    })

    describe("all ships are sunk", () => {
        const gameboard = Gameboard();
        const submarine = new Ship("submarine");
        const destroyer = new Ship("destroyer");
        gameboard.placeShip(submarine, 2, 0);
        destroyer.changeDirection();
        gameboard.placeShip(destroyer, 3, 2);
    
        test("no ship is sunk", () => {
            const actual = gameboard.areAllShipsSunk();
            expect(actual).toBe(false);
        })
    })

    describe("check for placed ships", () => {
        const gameboard = Gameboard();
        const submarine = new Ship("submarine");
        gameboard.placeShip(submarine, 2, 0);

        test("ship exist at coord", () => {
            const actual = gameboard.checkForShip(2, 0);
            expect(actual).toBe(true);
        })
        test("ship doesnt exist at coord", () => {
            const actual = gameboard.checkForShip(4, 0);
            expect(actual).toBe(false);
        })
    })
}) 