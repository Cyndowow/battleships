import { SHIP_LENGTHS } from "../helpers/helpers"

export default class Ship {
    constructor(type) {
        this.id = type;
        this.length = SHIP_LENGTHS[type];
        this.hits = Array(this.length).fill(null);
        this.direction = "horizontal";
    }
    hit(index) {
        this.hits[index] = "hit"
    }
    getHits() {
        return this.hits;
    }
    isSunk() {
        if (this.hits.every((h) => h === "hit")) {
            return true;
        } else {
            return false;
        }
    }
    changeDirection() {
        this.direction === "horizontal" ? (this.direction = "vertical") : (this.direction = "horizontal");
    }
    getDirection() {
        return this.direction;
    }
}

