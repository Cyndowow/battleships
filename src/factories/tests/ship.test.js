import Ship from "../ship";

describe("ship functions", () => {
    let testShip = new Ship("carrier");
    
    
    test("return ship id, length, hits", () => {
        expect(testShip).toEqual({ id: "carrier", length: 5, hits: [], direction: "horizontal" })
    })

    test("change direction", () => {
        testShip.changeDirection();
        expect(testShip.direction).toBe("vertical");
    })

    describe("hit function", () => {
        const ship = new Ship("submarine");
        test("no hits", () => {
            expect(ship.hits).toEqual([]);
        })
        test("one hit", () => {
            ship.hit(2);
            expect(ship.hits).toEqual([2]);
        })
    })

    describe("isSunk function", () => {
        const ship = new Ship("destroyer");
        test("not sunk", () => {
            expect(ship.isSunk()).toBe(false);
        })
        test("hit but not sunk", () => {
            ship.hit(0);
            expect(ship.isSunk()).toBe(false);
        })
        test("sunk", () => {
            ship.hit(1);
            expect(ship.isSunk()).toBe(true);
        })
        const bigShip = new Ship("carrier");
        test("bigger Ship sunk", () => {
            bigShip.hit(0)
            bigShip.hit(1)
            bigShip.hit(2)
            bigShip.hit(3)
            bigShip.hit(4)
            expect(bigShip.isSunk()).toBe(true);
    })
    })

})



