import { renderPlayerFleet } from "./renderFunction"

let totalAmountShips = 0;

function shipDrag(player, shipName) {
    let amountLeft = 1;
    const ship = document.querySelector(shipName);
    const body = document.querySelector("body");
    const cells = document.querySelectorAll(".cell-p1");
    const child = ship.childNodes;
    let dragSelection;
    let offset;
    let dir = "h";

    //offset for ship length
    if(child[0]) child[0].addEventListener("mouseenter", () => (offset = 0));
    if(child[1]) child[1].addEventListener("mouseenter", () => (offset = -1));
    if(child[2]) child[2].addEventListener("mouseenter", () => (offset = -2));
    if(child[3]) child[3].addEventListener("mouseenter", () => (offset = -3));
    if(child[4]) child[4].addEventListener("mouseenter", () => (offset = -4));

    //change dir of ship
    ship.addEventListener("click", (e) => changeDir(e));

    ship.addEventListener("dragstart", (e) => {
        //shows reserved position
        for (let i = 0; i < 10; i++) 
            player.gameBoard.board[i].forEach((e, j) => {
                if (e === "res") document.getElementById(`p1-row${i}-cell${j}`).classList.toggle("not-available");
            })
    })

    ship.addEventListener("dragend", (e, i) => {
        //remove reservation display
        document.querySelectorAll(".not-available").forEach((e) => e.classList.remove("not-available"));

        if(dragSelection === -1) return;
        let pos1;
        let pos2;
        let pos = "" + dragSelection;

        //transform index of string to array [pos1, pos2]
        if(dragSelection < 10) {
            pos1 = 0;
            pos2 = dragSelection;
        } else {
            pos = pos.split("");
            pos1 = pos[0] * 1;
            pos2 = pos[1] * 1;
        }

        //place ships with correct offset
        if(dir === "h") pos2 += offset;
        if(dir === "v") pos1 += offset;
        if(pos2 < 0) return;
        if(shipName === ".ship-2") {
            if(player.gameBoard.placeShip(pos1, pos2, 2, dir) === false) return;
        }
        if(shipName === ".ship-3") {
            if(player.gameBoard.placeShip(pos1, pos2, 3, dir) === false) return;
        }
        if(shipName === ".ship-4") {
            if(player.gameBoard.placeShip(pos1, pos2, 4, dir) === false) return;
        }
        if(shipName === ".ship-5") {
            if(player.gameBoard.placeShip(pos1, pos2, 5, dir) === false) return;
        }
        renderPlayerFleet(player);

        //remove ship from container if it has been placed
        amountLeft -= 1;
        totalAmountShips++;
        if(totalAmountShips === 5) player.gameBoard.setStartAllowed(true);
        if(amountLeft === 0) ship.parentNode.style.display = "none";
    });

    //listen for drag on cells
    cells.forEach((e, i) => {
        e.addEventListener("dragover", (e) => {
            e.preventDefault();
            dragSelection = i;
        });
    });

    //remove index if dropped outside cell
    body.addEventListener("dragenter", () => {
        dragSelection = -1;
    })

    function changeDir(e) {
        if(dir === "h") {
            dir = "v";
            e.target.parentNode.classList.toggle("rotated");
        } else {
            dir = "h";
            e.target.parentNode.classList.toggle("rotated");
        }
    }
}

export { shipDrag, totalAmountShips }