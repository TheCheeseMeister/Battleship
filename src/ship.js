export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;

        this.isSunk();
    }

    isSunk() {
        if (this.length == this.hits) {
            this.sunk = true;
            return true;
        } else {
            return false;
        }
    }
}