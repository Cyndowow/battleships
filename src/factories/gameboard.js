const Gameboard = () => {
    
    let board = [];
    for (let i = 0; i < 100; i++) {
        board.push({hasShip: false, isShot: false});
    }                                                 

    let placedShips = [];

    const placeShip = (ship, y0, x0) => {

    }

    const getBoard = () => board;

    return {
        getBoard,        
    }
}

export default Gameboard;