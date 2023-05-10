import Ship from "../ship";
import Gameboard from "../gameboard";

describe("Gameboard", () => {
    let testBoard ;
    beforeEach(() => {
        testBoard = new Gameboard();
    })

    test("creates a gameboard with right amound of cells", () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push({ hasShip: false, isShot: false});
        }
        expect(testBoard.board).toEqual(arr);
    })
}) 