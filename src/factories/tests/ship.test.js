import Ship from "../ship";

describe("test ship creation", () => {
    let carrier;
    let submarine;
    beforeEach(() => {
        carrier = new Ship(5);
        submarine = new Ship(3);
        })
        test("has length", () => {
            expect(carrier.length).toBe(5)
        })
        test("create ship tiles", () => {
            expect(submarine.tiles).toEqual([0, 1, 2]);
        })
        test("ship takes hits", () => {
            submarine.hit(0);
            expect(submarine.tiles[0]).toBe("hit");
        })
        test("ship is sunk", () => {
            submarine.hit(0);
            submarine.hit(1);
            submarine.hit(2);
            expect(submarine.isSunk()).toBe(true);
        })
})