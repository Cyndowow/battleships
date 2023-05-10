const size = 10;

export default class Gameboard {
    constructor(board) {
        this.board = board || []; //for custom board sizes
        this.missedShots = [];
        if (!this.board.length) this.initialize();
    }

    initialize() {
        for (let i = 0; i < 100; i++) {
            this.board.push({ hasShip: false, isShot: false});
        }
    }
}
