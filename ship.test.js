const ship = require("./ship");

test("return ship object, length, hits, sunk", () => {
    expect(ship(5)).toEqual({
        length: 5,
        hits: 0,
        sunk: false,
    })
})
