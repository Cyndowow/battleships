import Gameboard from "../gameboard";


describe("gameboard tests", () => {
    let g;
    beforeEach(() => {
        g = new Gameboard();
    })
    test("creates gameboard 10x10", () => {
        expect(g.board.length && g.board[0].length).toBe(10);
    })
    test("return false if ship exists at position", () => {
        g.placeShip(0, 0, 2, "h");
        expect(g.placeShip(0, 1, 2, "h")).toBe(false);
    })
    test("place horizontal ship of length 1 at pos 0", () => {
        g.placeShip(0, 0, 1, "h");
        expect(g.board[0]).toBeTruthy();
    })
    test("h ship length 4 at pos 4", () => {
        g.placeShip(4, 4, 4, "h");
        expect(g.board[4] && g.board[5] && g.board [6] && g.board[7]).toBeTruthy();
    })
    test("reject horizontal ship that goes over right edge", () => {
        expect(g.placeShip(1, 6, 5, "h")).toBeFalsy();
    })
    test("extend vertical ship down", () => {
        g.placeShip(0, 0, 2, "v");
        expect(g.board[0][0] && g.board[1][0]).toBeTruthy();
    })
    test("reject vertical ship from going over the edge", () => {
        expect(g.placeShip(7, 5, 4, "v")).toBeFalsy();

    })
    test("receive Attack and return hit", () => {
        g.placeShip(0, 5, 5, "h");
        expect(g.receiveAttack(0, 5)).toBe("hit");
    })
    test("receive multiple attacks and respond from ship itself", () => {
        g.placeShip(0, 0, 5, "v");
        g.receiveAttack(0, 0);
        g.receiveAttack(1, 0);
        expect(g.board[0][0].ship.tiles[g.board[0][0].shipPos] &&
                g.board[1][0].ship.tiles[g.board[1][0].shipPos]).toBe("hit");
    })
    test("sunk ship returns sunk", () => {
      g.placeShip(0, 0, 2, "v");
      g.receiveAttack(0, 0);
      g.receiveAttack(1, 0);
      expect(g.isSunk(0, 0)).toBeTruthy();
    });

    test("are all ships on the board sunk?", () => {
      g.placeShip(0, 0, 2, "v");
      g.placeShip(0, 4, 2, "h");
      g.receiveAttack(0, 0);
      g.receiveAttack(1, 0);
      g.receiveAttack(0, 4);
      g.receiveAttack(0, 5);
    expect(g.areAllSunk(g.board)).toBeTruthy();
    })

    test("return start allowed", () => {
        expect(g.getStartAllowed()).toBe(false);
    })
    test("set start allowed", () => {
        g.setStartAllowed(true);
        expect(g.getStartAllowed()).toBe(true);
    })
})