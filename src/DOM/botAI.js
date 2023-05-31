import {renderAttackP2} from "./renderFunction"

let wasHit = false;
let status = false;
let lasHitPos = [];
let firstHitPos = [];
let secondHitPos = [];
let surroundingPos =  [];
let attackDirection;

function setWasHit(value, stat, pos1, pos2) {
    wasHit = value;
    if(stat !== undefined) status = stat;
    if(pos1 !== undefined) lasHitPos = [pos1, pos2];
    if(firstHitPos.length == 0 && pos1 !== undefined) firstHitPos = [pos1, pos2];
    else if (firstHitPos.length !== 0 && secondHitPos !== 0 && pos1 !== undefined) secondHitPos = [pos1, pos2];
}

function getWasHit() {
    return [wasHit, lasHitPos, status];
}

function registerSurroundingPos(pos1, pos2) {
    surroundingPos = [];
    if(pos2 !== 0) surroundingPos.push([pos1, pos2 - 1]);
    if(pos2 !== 0) surroundingPos.push([pos1, pos2 + 1]);
    if(pos1 !== 0) surroundingPos.push([pos1 - 1, pos2]);
    if(pos1 !== 0) surroundingPos.push([pos1 + 1, pos2]);
    return surroundingPos;
}

function aiPlay(repeat, p1, p2, isSunk) {
    let pos//, pos1, pos2;*/
    if(isSunk === true) {
        lasHitPos = [];
        firstHitPos = [];
        secondHitPos = [];
        surroundingPos = [];
        wasHit = false;
        status = false;
        attackDirection = "";
    }

    if(!status && !wasHit) {
        pos = p2.randomPos();

        return renderAttackP2(p1, p2, pos[0], pos[1]);
    } else if (secondHitPos.length !== 0 && wasHit && !repeat) {
        let newPos;
        if(firstHitPos[0] == secondHitPos[0] - 1) newPos = attackTowards("down");
        if(firstHitPos[0] == secondHitPos[0] + 1) newPos = attackTowards("up");
        if(firstHitPos[1] == secondHitPos[1] - 1) newPos = attackTowards("right");
        if(firstHitPos[1] == secondHitPos[1] + 1) newPos = attackTowards("left");
        return renderAttackP2(p1, p2, newPos[0], newPos[1]);
    } else if (secondHitPos.length && status && !wasHit) {
        lasHitPos = firstHitPos;
        secondHitPos = [];
        let newPos;
        if(attackDirection === "up") newPos = attackTowards("down");
        if(attackDirection === "down") newPos = attackTowards("up");
        if(attackDirection === "right") newPos = attackTowards("left");
        if(attackDirection === "left") newPos = attackTowards("right");
        return renderAttackP2(p1, p2, newPos[0], newPos[1]);
    } else if (status) {
        if(surroundingPos.length == 0) registerSurroundingPos(lasHitPos[0], lasHitPos[1]);
        if(surroundingPos.length == 0 && status == true) registerSurroundingPos(firstHitPos[0], firstHitPos[1]);
        let newPos = surroundingPos.pop();
        return renderAttackP2(p1, p2, newPos[0], newPos[1]);
    }
}

function attackTowards(dir) {
    if(dir === "left") {
        attackDirection = "left";
        return [lasHitPos[0], lasHitPos[1] - 1]
    }
    if(dir === "right") {
        attackDirection = "right";
        return [lasHitPos[0], lasHitPos[1] + 1]
    }
    if(dir === "down") {
        attackDirection = "down";
        return [lasHitPos[0] + 1, lasHitPos[1]]
    }
    if(dir === "up") {
        attackDirection = "up";
        return [lasHitPos[0] - 1, lasHitPos[1]]
    }
}

export {
    aiPlay,
    getWasHit,
    setWasHit,
    lasHitPos,
    surroundingPos
}