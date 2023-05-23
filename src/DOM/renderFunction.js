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
}

export {
    renderBoards,
}