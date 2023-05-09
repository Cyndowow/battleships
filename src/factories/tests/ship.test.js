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


})



