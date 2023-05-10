import { SHIP_TYPES, createFleet} from "../helpers/helpers"


export default class Player {
    constructor(type = "human") {
        this.type = type;
        this.fleet = createFleet(SHIP_TYPES);
    }
    
    
    getType() {
        return this.type;
    }
    getFleet() {
        return this.fleet;
    }
    attack(y, x, enemyBoard) {
        enemyBoard.receiveAttack(y, x);
    }
    
}