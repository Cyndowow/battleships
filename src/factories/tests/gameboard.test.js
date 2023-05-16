import Gameboard from "../gameboard";

describe("test gameboard creation", () => {
    describe("board", () => {
        let testBoard;
        beforeEach(() => {
            testBoard = Gameboard();
        })

        test("empty board", () => {
            const arr = [];
            for (let i = 0; i < 100; i++) {
                arr.push({hasShip: false, isShot: false});
            } 
        expect(testBoard.getBoard()).toEqual(arr);
        })
        test("update cell if shot", () => {
            testBoard.receiveAttack(33);
            expect(testBoard.getBoard()[33].isShot).toBe(true);
        })
        test("doesnt produce a fake result", () => {
            expect(testBoard.getBoard()[45].isShot).toBe(false);
        })
        test("reports if shot missed", () => {
            expect(testBoard.checkIfAttackHit(25)).toBe(false);
        })
        test("confirms a hit", () => {
            testBoard.getBoard()[33].hasShip = true;
            expect(testBoard.checkIfAttackHit(33)).toBe(true);
        })
    })
})