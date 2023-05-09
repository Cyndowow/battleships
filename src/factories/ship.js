export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = [];
    }
    hit(index) {
        this.hits.push(index);
    }
}

