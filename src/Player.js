import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(real) {
        this.real = real; // true = human, false = cpu
        this.board = new Gameboard();
    }
}