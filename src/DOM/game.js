import Player from "../factories/player";

let p1, p2;

function initGame() {
    p1 = new Player("You");
    p2 = new Player("Your enemy");

    p1.isTurn(p2);
    p2.createFleet();
}

export {initGame, p1, p2};