import Ship from "../ship";

describe("test ship creation", () => {
    describe("properties", () => {
        const carrier = Ship("carrier");
        
        test("id", () => {
            expect(carrier.id).toBe("carrier");
        })
        test("length", () => {
            expect(carrier.length).toBe(5);
        })
        test("direction", () => {
            expect(carrier.getDirection()).toBe("horizontal");
        })
        test("hits", () => {
            expect(carrier.getHits()).toEqual([null, null, null, null, null])
        })
    })
    describe("getting hit and being sunk", () => {
        const ship = Ship("destroyer");
        test("take hit on index 0", () => {
            ship.hit(0);
            expect(ship.getHits()).toEqual(["hit", null])
        })
        test("ship is sunk", () => {
            ship.hit(1);
            expect(ship.isSunk()).toBe(true);
        })
   }) 
})