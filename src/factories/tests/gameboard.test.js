import Gameboard from "../gameboard";
import Ship from "../ship";

describe("test gameboard creation", () => {
    describe("board", () => {
        let testBoard;
        beforeEach(() => {
            testBoard = new Gameboard();
        })

        test("empty board", () => {
            const arr = [];
            for (let i = 0; i < 100; i++) {
                arr.push({hasShip: false, isShot: false});
            } 
        expect(testBoard.board).toEqual(arr);
        })
        test("update cell if shot", () => {
            testBoard.receiveAttack(33);
            expect(testBoard.board[33].isShot).toBe(true);
        })
        test("doesnt produce a fake result", () => {
            expect(testBoard.board[45].isShot).toBe(false);
        })
        test("reports if shot missed", () => {
            expect(testBoard.checkIfAttackHit(25)).toBe(false);
        })
        test("confirms a hit", () => {
            testBoard.board[33].hasShip = true;
            expect(testBoard.checkIfAttackHit(33)).toBe(true);
        })
        test("rejects ship that collides with another ship", () => {
            testBoard.board[12].hasShip = "carrier";
            expect(testBoard.checkCollisions([2, 12, 22, 32])).toBe(false);
        })
        test("rejects ship that passes through map edge on x axis", () => {
            expect(testBoard.checkCollisions([8, 9, 10, 11, 12])).toBe(false);
        })
        test("rejects ship that passes through map edge on y axis", () => {
            expect(testBoard.checkCollisions([77, 87, 97, 107])).toBe(false);
        })
        test("returns location array of a ship", () => {
            expect(testBoard.createLocationArray(23, Ship("destroyer"), "y")).toEqual([23, 33])
        })
        /*test("render opponent board", () => {
            const arr = [];
            for (let i = 0; i < 100; i++) {
                arr.push("empty");
            }

            testBoard[23] = {hasShip: true, isShot: true};
            testBoard[79] = {hasShip: false, isShot: true};
            arr[23] = "hit";
            arr[79] = "miss";
            const newBoard = testBoard;
            expect(testBoard.opponentBoard(newBoard)).toEqual(arr); 
        })*/
    })
})