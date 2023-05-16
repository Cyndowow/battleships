import Gameboard from "../gameboard";
import Player from "../player";

describe("player test", () => {
    let player;
    let playerBoard;
    let oppBoard;
    beforeEach(() => {
        player = new Player("human");
        playerBoard = new Gameboard();
        oppBoard = new Gameboard();
    })
    test("create a player", () => {
        expect(player.name).toBe("human");
    })
    test("fire a shot at the opponents board", () => {
        player.fireShot(25, oppBoard);
        expect(oppBoard.board[25].isShot).toBe(true);
    })
})