export default class Ship {
    constructor(length) {
        this.length = length;
        this.tiles = [...Array(length).keys()];
        this.domTargets = [];
    }    
    hit(pos) {
        if(this.tiles[pos] === "hit") return false;
        this.tiles.splice(pos, 1, "hit");
    }
    isSunk() {
        let stillAlive = false;
        this.tiles.forEach((e) => {
            if(e !== "hit") stillAlive = true;
        })
        return stillAlive === true ? false : true;
    }
}











