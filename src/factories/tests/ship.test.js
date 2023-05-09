import Ship from "../ship";

describe("ship functions", () => {
    let testShip;

    beforeEach(() => {
        testShip = new Ship(5);
    });
    
    
    test("return ship object, length, hits, sunk", () => {
        expect(testShip).toEqual({ length: 5, hits: [] })
    })

    test("return ship with 4 hits", () => {
        testShip.hit(2);
        expect(testShip.hits).toContain(2);
    })

    test("ship sinks", () => {
        testShip.hit(1);
        testShip.hit(2);
        testShip.hit(3);
        testShip.hit(4);
        testShip.hit(5);
        expect(testShip.isSunk()).toBe(true);
    })

})



