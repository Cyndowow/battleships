import { SHIP_LENGTHS } from "../helpers/helpers"

export default class Ship {
    constructor(type) {
        this.id = type;
        this.length = SHIP_LENGTHS[type];
        this.hits = []
    }
    hit(index) {
        this.hits.push(index);
    }
    isSunk() {
        return this.hits.length === this.length;
    }
}

