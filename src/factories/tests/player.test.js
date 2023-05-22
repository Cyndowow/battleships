import Gameboard from "../gameboard";
import Player from "../player";
import Ship from "../ship";


test("player automatically has gameboard", () => {
    let player = new Player("human");
    let gameboard = new Gameboard();
    expect(JSON.stringify(player.gameBoard)).toEqual(JSON.stringify(gameboard)); //had to stringify because of serialization issue
})

describe("player test", () => {
    let player;
    let opp;
    beforeEach(() => {
        player = new Player("human");
        opp = new Player("opp");
    })
    test("create a player", () => {
        expect(player.name).toBe("human");
    })
    test("fire a shot at the opponents board", () => {
        player.fireShot(opp, 0, 0);
        expect(opp.gameBoard.board[0][0]).toBe("miss");
    })
    test("swap turn", () => {
        player.isTurn(opp);
        expect(player.turn).toBe(true);
    })
    test("swap turn back", () => {
        player.isTurn(opp);
        opp.isTurn(player);
        expect(player.turn).toBe(false);
    })
    test("fleet creation", () => {
        player.createFleet();
        console.log(player.ships);
        expect(player.ships).not.toBe(null);
    })
})
