import { SHIP_TYPES } from "../helpers/helpers";

const Gameboard = () => {
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];
    const areAllShipsPlaced = () => placedShips.length === SHIP_TYPES.length;

    const _adjustCoords = (y0, x0, i, direction) => {
        let x = x0 +i;
        let y = y0;
        if (direction === "vertical") {
            x = x0;
            y = y0+i;
        }
        return[y, x];
    }

    const checkValid = (length, direction, y0, x0) => {
        const cells = [];
        for (let i = 0; i < length; i++) {
            const [y, x] = _adjustCoords(y0, x0, i, direction);

            if(y < 10 && x < 10) {
                cells.push(board[y][x]);
            } else {
                return false;
            }
        }
        return cells.every((cell) => cell === null);
    }

    const placeShip = (ship, y0, x0) => {
        const direction = ship.getDirection();
        const valid = checkValid(ship.length, direction, y0, x0);
        if (valid) {
            for (let i = 0; i < ship.length; i++) {
                const [y, x] = _adjustCoords(y0, x0, i, direction);
                //place ship with index
                board[y][x] = { ship, index: i}
            }

            placedShips.push(ship);
            return valid;
        } else {
            return valid;
        }
    }

    return {
        getBoard,
        areAllShipsPlaced,
        placeShip,

    }
}

export default Gameboard;