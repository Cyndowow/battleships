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

}

export {
    renderBoards,
    resetBoards,
    renderButtons,
}