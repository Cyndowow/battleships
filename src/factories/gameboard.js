const Gameboard = () => {
    
    let board = [];
    for (let i = 0; i < 100; i++) {
        board.push({hasShip: false, isShot: false});
    }                                                 

    const locationArray = (location, ship, axis) => {
        const locationArray = [];
        for (let i = 0; i < ship.length; i++) {
            axis === "x" ? locationArray.push(location + i) : locationArray.push(location + i * 10);
        }
        return locationArray;
    }

    const receiveAttack = (location) => {
        board[location].isShot = true;
    }

    const checkIfAttackHit = (location) => {
        return board[location].hasShip;
    }

    const checkCollisions = (locationArray) => {
        //on x axis, stops going over boundaries
        const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89];
        if (locationArray.some((loc) => board[loc])) {
            //check for boundaries
            return false;
        } else if (locationArray.some((loc) => board[loc].hasShip)) {
            //checks for other Ships
            return false;
        } else if (
            collisions.some((num) => {
                return [num, num +1].every((combination) => locationArray.includes(combination));
            })
        ) {
            return false
        } else {
            return true;
        }
    }

    const getBoard = () => board;

    return {
        getBoard,
        locationArray,
        checkCollisions,
        receiveAttack,
        checkIfAttackHit
    }
}

export default Gameboard;