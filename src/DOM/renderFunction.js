import { initGame, p1, p2} from "./game"

function renderBoards(p1, p2) {
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell-p1");
        cell.setAttribute("id", `p1-index${i}`);
        document.getElementById("playerBoard").appendChild(cell);
    }
}

export {
    renderBoards,
}