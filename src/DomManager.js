const boardContainer = document.getElementById('container');

export default class DomManager {
    constructor() {
        this.prevGrids = [];
    }

    createNewGrid(gameboard, player) {
        let grid = document.createElement("div");
        grid.classList.add("board");

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                let temp = document.createElement("div");
                temp.classList.add("space");

                if (gameboard[i][j] != null) {
                    temp.textContent = "Ship";
                }

                temp.value = [i, j];

                if (player.real == false) {
                    temp.addEventListener("click", () => {
                        player.board.receiveAttack(temp.value);
                        this.resetContainer();
                        this.updateBoards();
                    });
                }

                grid.appendChild(temp);
            }
        }

        boardContainer.appendChild(grid);

        this.prevGrids.push([gameboard, player]);
    }

    resetContainer() {
        boardContainer.innerHTML = '';
    }

    updateBoards() {
        for (let prev of this.prevGrids) {
            let gameboard = prev[0];
            let player = prev[1];

            let grid = document.createElement("div");
            grid.classList.add("board");

            for (let i = 0; i < gameboard.length; i++) {
                for (let j = 0; j < gameboard[i].length; j++) {
                    let color = false;
                    
                    let temp = document.createElement("div");
                    temp.classList.add("space");

                    if (gameboard[i][j] != null) {
                        temp.textContent = "Ship";
                    }

                    temp.value = [i, j];

                    for (let hit of player.board.hits) {
                        if (JSON.stringify(hit) == JSON.stringify([i,j])) {
                            color = true;
                            break;
                        }
                    }

                    if (!color && player.real == false) {
                        temp.addEventListener("click", () => {
                            player.board.receiveAttack(temp.value);
                            this.resetContainer();
                            this.updateBoards();
                        });
                    } else if (color) {
                        temp.style.color = 'red';
                    }

                    grid.appendChild(temp);
                }
            }

            boardContainer.appendChild(grid);
        }
    }
}