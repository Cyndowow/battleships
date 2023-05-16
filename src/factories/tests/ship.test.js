import Ship from "../ship";

describe("test ship creation", () => {
    let carrier;
    let submarine;
    beforeEach(() => {
        carrier = new Ship("carrier", [0, 1, 2, 3, 4]);
        submarine = new Ship("submarine", [12, 13, 14]);
        })
        test("take hit on index 0", () => {
            carrier.hit(0);
            expect(carrier.hits).toEqual([0])
        })
        test("takes multiple hits", () => {
            submarine.hit(12);
            submarine.hit(13);
            expect(submarine.hits).toEqual([12, 13]);
        })
        test("ship is not sunk", () => {
            submarine.hit(12);
            submarine.hit(13);
            expect(submarine.isSunk()).toBe(false);
        })
        test("ship is sunk", () => {
            submarine.hit(12);
            submarine.hit(13);
            submarine.hit(14);
            expect(submarine.isSunk()).toBe(true);
        })
})