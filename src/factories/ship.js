export default class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.tiles = [...Array(length).keys()];
        this.domTargets = [];
    }    
    hit(pos) {
        if(this.tiles[pos] === "hit") return false;
        this.tiles.splice(pos, 1, "hit");
    }
    isSunk() {
        let stilAlive = false;
        this.tiles.forEach((e) => {
            if(e !== "hit") stilAlive = true;
        })
        return stilAlive === true ? false : true;
    }
}











