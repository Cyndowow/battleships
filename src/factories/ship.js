import {SHIP_LENGTH} from "../helpers/helpers"

export default class Ship {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.hits = [];
    }    
    hit(index) {
        this.hits.push(index);
    }
    isSunk() {
        return this.position.every((positionCell) => 
            this.hits.includes(positionCell)
        )
    }
}











