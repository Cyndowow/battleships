import Ship from "./ship";

export default class Gameboard {
	constructor() {
		this.board = [];
		this.isStartAllowed = false;
		this.hasStarted = false;
		this.create();
	}

	create() {
		for (let i = 0; i < 10; i++) {
			this.board[i] = [];
			for (let j = 0; j <10; j++) {
				this.board[i].push(false);
			}
		}
	}

	getStartAllowed() {
		return this.isStartAllowed;
	}

	setStartAllowed(value) {
		this.isStartAllowed = value;
	}

	getHasStarted() {
		return this.hasStarted;
	}

	setHasStarted(value) {
		this.hasStarted = value;
	}

	receiveAttack(pos1, pos2) {
		if (this.board[pos1][pos2] === "miss") return false;
		if (
			typeof this.board[pos1][pos2] == "object" &&
			this.board[pos1][pos2].ship.tiles[this.board[pos1][pos2].shipPos] === "hit"
		) return false;

		if(!this.board[pos1][pos2] || this.board[pos1][pos2] === "res") {
			this.board[pos1][pos2] = "miss";
			return this.board[pos1][pos2];
		} else {
			this.board[pos1][pos2].ship.hit(this.board[pos1][pos2].shipPos);
			return this.board[pos1][pos2].ship.tiles[this.board[pos1][pos2].shipPos];
		}
	}

	placeShip(pos1, pos2, length, dir) {
		if (this.board[pos1][pos2]) return false;
		let ship = new Ship(length);
		let shipPos = 0;

		if (dir === "h") {
			if (pos2 + ship.length > 10) return false;

			for (let i = 0; i < length; i++) {
				if (this.board[pos1][pos2 + i] === "res") return false;
			}

			for (let i = pos2; i < pos2 + ship.length; i++) {
				this.board[pos1].splice(i, 1, { ship, shipPos });
				this.reserveAround(pos1, pos2 + shipPos);
				shipPos++;
			}
		}
		if (dir === "v") {
			if(pos1 + ship.length > 10) return false;

			for (let i = 0; i < length; i++) {
				if (this.board[pos1 + i][pos2] === "res") return false;
			}

			for (let i = pos1; i < pos1 + ship.length; i++) {
				this.board[i].splice(pos2, 1, {ship, shipPos});
				this.reserveAround(pos1 + shipPos, pos2);
				shipPos++;
			}
		}
	}

	reserveAround(pos1, pos2) {
		let board = this.board;
		function cell(n1, n2) {
			if(pos1 + n1 > 9 || pos1 + n1 < 0) return;
			if(board[pos1 + n1][pos2+n2] === false) board[pos1 + n1][pos2+n2] = "res";
		}
		function reserveCell(row) {
			cell(row, -1);
			cell(row, 0);
			cell(row, 1);
		}
		reserveCell(-1);
		reserveCell(0);
		reserveCell(1);
	}

	isSunk(pos1, pos2) {
		return this.board[pos1][pos2].ship.isSunk() === true ? true : false;

	}
   	areAllSunk = (board) => {
    	let notSunk = false;
    	for (let i = 0; i < 10; i++)
      		board[i].forEach((e) => {
        		if (!e || e === "miss" || e === "res") return;
        		if (e.ship.isSunk() === false) notSunk = true;
     	});
    	return notSunk === true ? false : true;
  	};
}


