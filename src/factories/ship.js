import { SHIP_LENGTHS } from "../helpers/helpers"

export default class Ship {
    constructor(type) {
        this.id = type;
        this.length = SHIP_LENGTHS[type];
        this.hits = [];
        this.direction = "horizontal";
    }
    hit(index) {
        this.hits.push(index);
    }
    isSunk() {
        return this.hits.length === this.length;
    }
    changeDirection() {
        this.direction === "horizontal" ? (this.direction = "vertical") : (this.direction = "horizontal");
    }
}

