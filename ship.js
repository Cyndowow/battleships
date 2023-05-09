function ship(length) {
    const ShipLength = length;
    let hits = 0;
    let sunk = false;

    const returnShip = {
        length: ShipLength,
        hits: hits,
        sunk: sunk,
    }

    return returnShip;
}

module.exports = ship;