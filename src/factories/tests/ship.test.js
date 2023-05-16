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
})