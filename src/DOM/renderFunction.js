import { initGame, p1, p2} from "./game"


function renderBoards(p1, p2) {
    for(let i = 0; i < 10; i++) {
        let row = document.createElement("div");
        row.classList.add("row-p1");
        row.setAttribute("id", `p1-row${i}`);
        document.getElementById("playerBoard").appendChild(row);
        
        p1.gameBoard.board[i].forEach((e, j) => {
            let cell = document.createElement("div");
            cell.classList.add("cell-p1");
            cell.setAttribute("id", `p1-row${i}-cell${j}`);
            row.appendChild(cell);

            //event listener for clicks on p2 board
            cell.addEventListener("click", (e) => {
                if(!p1.getTurn() || !p1.gameBoard.getStartAllowed()) return;
                renderAttackP1(e, i, j, p1, p2);
            });
        });
    }
    for (let i = 0; i < 10; i++) {
        let row = document.createElement("div");
        row.classList.add("row-p2");
        row.setAttribute("id", `p2-row${i}`);
        document.getElementById("enemyBoard").appendChild(row);
        
        p1.gameBoard.board[i].forEach((e, j) => {
            let cell = document.createElement("div");
            cell.classList.add("cell-p2");
            cell.setAttribute("id", `p2-row${i}-cell${j}`);
            row.appendChild(cell);
        })
    }
}

function resetBoards() {
    document.querySelector(".board-buttons").innerHTML = "";
    document.querySelector(".ships").innerHTML = "";
    document.querySelectorAll(".board").forEach((board) => (board.innerHTML = ""));
    initGame();
}

function renderButtons(player) {
    const boardButtons = document.querySelector(".board-buttons")
    //const playerBoard = document.getElementById("playerBoard");
    const enemyBoard = document.getElementById("enemyBoard");

        const rand = document.createElement("button");
        rand.innerText = "Random";
        rand.classList.add("main-random");
        const reset = document.createElement("button");
        reset.innerText = "Reset";
        reset.classList.add("main-reset");
    
        const misc = document.querySelector(".misc");
        const startBtn = document.createElement("button");
        startBtn.innerText = "Start";
        startBtn.setAttribute("id", "start");
        misc.appendChild(startBtn);

    boardButtons.appendChild(rand);
    boardButtons.appendChild(reset);

    //reset board
    document.querySelector(".main-reset").addEventListener("click", () => {
        resetBoards();
        enemyBoard.classList.add("not-started");
    })

    //random Fleet for Player
    //document.querySelector("main-random").addEventListener("click", () => {
        //resetBoards();
        //p1.placeRandomFleet();
        ////renderPlayerFleet(p1);
        //p1.setStartAllowed(true);
        //document.querySelector(".ships").innerHTML = "";
    //})

    
    document.getElementById("start").addEventListener("click", (e) => {
        //dont start if not all ships are placed
        if(player.gameBoard.getStartAllowed() === false) return;

        enemyBoard.classList.remove("not-started");
        player.gameBoard.setHasStarted(true);
        
        //remove unnecessary buttons
        boardButtons.removeChild(document.querySelector(".main-random"));
        e.parent.removeChild(e.target);
    })

}

function renderPlayerFleet(player) {
    document.querySelectorAll(".cell-p1").forEach((e, i) => {
        let pos1, pos2;
        let pos = "" + i;

        //transform index string to array [pos1, pos2]
        if (i < 10) {
            pos1 = 0;
            pos2 = i;
        } else {
            pos = pos.split("");
            pos1 = pos[0];
            pos2 = pos[1];
        }

        if(!player.gameBoard.board[pos1][pos2]) return;
        if(player.gameBoard.board[pos1][pos2] === "res") e.classList.add("res");
        else e.classList.add("fleet");
    })
}

async function renderAttackP1(e, pos1, pos2, p1, p2) {
    document.getElementById("enemyBoard").classList.toggle("current-turn");
    let attack = p1.fireShot(p2, pos1, pos2);
    if(!attack) return; //doesnt use turn if tile already attacked
    if(attack === "miss") e.target.classList.add("miss");
    if(attack === "hit") {
        e.target.classList.add("hit");
        p2.gameBoard.board[pos1][pos2].ship.domTargets.push(e.target);
        //checks if ship is sunk and adds class if true
        if(p2.gameBoard.board[pos1][pos2].ship.isSunk())
            p2.gameBoard.board[pos1][pos2].ship.domTargets.forEach((e) => 
                e.classList.add("sunk")
            );
        return;
    }
    p2.isTurn(p1);

    await delay(1500);
    //switch to next player or end if all ships are sunk
    return p2.gameBoard.areAllSunk(p2.gameBoard.board) === true ? renderWin(p1) : aiPlay(false, p1, p2);
}

async function renderAttackP2(p1, p2, pos1, pos2) {
    let isSunk = false;
    let e = document.getElementById(`p2-row${pos1}-cell${pos2}`);
    let attack = p2.fireShot(p1, pos1, pos2);

    if(!attack) {
        let repeat = true;
        aiPlay(repeat, p1, p2);
    }
    if(attack === "miss") {
        setWasHit(false);
        e.classList.add("miss");
    }
    if(attack === "hit") {
        setWasHit(true, true, pos1, pos2);
        e.classList.add("hit");
        p1.gameBoard.board[pos1][pos2].ship.domTargets.push(e);

        //check if sunk
        if(p1.gameBoard.board[pos1][pos2].ship.isSunk()) {
            p1.gameBoard.board[pos1][pos2].ship.domTargets.forEach((e) => 
            e.classList.add("sunk")
            );
            isSunk = true;
            if(p1.gameBoard.areAllSunk(p1.gameBoard.board) === true) return renderWin(p2);
        }
        await delay(1500)
        return aiPlay(false, p1, p2, isSunk);
    }

    p1.isTurn(p2); //give turn to p1
}

function renderWin(player) {
    const dialog = document.querySelector(".winning-dialog");
    const restartBtn = document.querySelector(".restart");
    const closeDialog = document.querySelector(".close");
    const winText = document.querySelector(".win-text");

    winText.textContent = player.name + " won the game!";
    dialog.showModal();
    restartBtn.addEventListener("click", () => {
        dialog.close();
        resetBoards();
    })
    closeDialog.addEventListener("click", () => {
        dialog.close();
    })
}

export {
    renderBoards,
    resetBoards,
    renderButtons,
    renderPlayerFleet,
    renderAttackP2,
    renderWin
}