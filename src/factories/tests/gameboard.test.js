import Gameboard from "../gameboard";

describe("test gameboard creation", () => {
    describe("board", () => {
        let testBoard = Gameboard().getBoard();
            
        test("empty board", () => {
            const arr = [];
            for (let i = 0; i < 100; i++) {
                arr.push({hasShip: false, isShot: false});
            } 
        expect(testBoard).toEqual(arr);
        })
    })
})