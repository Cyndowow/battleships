import { SHIP_TYPES, createFleet, randCoords} from "../helpers/helpers"

export default class Player {
    constructor(name) {
        this.name = name;
        this.fleet = createFleet(SHIP_TYPES);
    }
    getName() {
        return this.name;
    }
    getFleet() {
        return this.fleet;
    }
    attack(y, x, enemyBoard) {
        enemyBoard.receiveAttack(y, x);
    }
    autoAttack(enemyBoard) {
        const [y, x] = randCoords();
        const cell = enemyBoard.getBoard()[y][x];
        if( cell === "miss" || cell === "hit") {
            //repeat until valid cell is found
            this.autoAttack(enemyBoard);
        } else {
            //attack valid cell
            enemyBoard.receiveAttack(y, x)
        }
    }
    
}