import {SHIP_LENGTH} from "../helpers/types"

const Ship = (type) => {
    const id = type;
    const length = SHIP_LENGTH[type];
    
    
    let direction = "horizontal";
    const getDirection = () => direction;


    const hits = Array(length).fill(null);
    const hit = (index) => (hits[index] = "hit");
    const getHits = () => hits; 

    const isSunk = () => {
        if(hits.every((h) => h === "hit")) {
            return true;
        } else {
            return false;
        }
    }

    return {
        id,
        length,
        getDirection,
        getHits,
        isSunk,
        hit,
    }
    

}

export default Ship;









