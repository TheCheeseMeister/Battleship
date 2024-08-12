const boardContainer = document.getElementById('container');

export default class DomManager {
    constructor() {
        this.prevGrids = [];
        this.playerTurn = true;
        this.human = null;

        this.win = false;
    }

    winner() {
        let text = document.createElement("h3");
        text.textContent = "We have ourselves a winner!";

        const header = document.getElementById("header");

        header.after(text);
    }

    cpuTurn() {
        function checkHitsAndMisses(coord) {
            for (let hit of p.board.hits) {
                if (JSON.stringify(hit) == JSON.stringify(coord)) {
                    return false;
                }
            }

            for (let miss of p.board.misses) {
                if (JSON.stringify(miss) == JSON.stringify(coord)) {
                    return false;
                }
            }

            return true;
        }

        let p = this.human;

        let x = 0;
        let y = 0;
        
        while (true) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            if (checkHitsAndMisses([x,y])) {
                break;
            }
        }

        this.win = this.human.board.receiveAttack([x,y]);
        if (this.win) {
            console.log("CPU WINS");
            this.winner();
        }

        this.resetContainer();
        this.updateBoards();
    }

    createNewGrid(gameboard, player) {
        if (player.real == true) {
            this.human = player;
        }

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
                        if (this.playerTurn) {
                            this.win = player.board.receiveAttack(temp.value);
                            this.resetContainer();
                            this.updateBoards();

                            this.cpuTurn();
                        }
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
                    let missColor = false;
                    
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

                    for (let miss of player.board.misses) {
                        if (JSON.stringify(miss) == JSON.stringify([i,j])) {
                            missColor = true;
                            break;
                        }
                    }

                    if (!color && !missColor && player.real == false) {
                        temp.addEventListener("click", () => {
                            if (this.playerTurn) {
                                this.win = player.board.receiveAttack(temp.value);
                                if (this.win) {
                                    console.log("YOU WIN");
                                    this.winner();
                                }
                                this.resetContainer();
                                this.updateBoards();

                                this.cpuTurn();
                            }
                        });
                    } else if (color) {
                        temp.style.color = 'red';
                    } else if (missColor) {
                        temp.style.backgroundColor = 'grey';
                    }

                    grid.appendChild(temp);
                }
            }

            boardContainer.appendChild(grid);
        }

        this.playerTurn = !this.playerTurn;
    }
}