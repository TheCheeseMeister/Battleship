export default class Gameboard {
    constructor() {
        //this.grid = new Array(10).fill(new Array(10).fill(null));
        this.grid = Array.from(new Array(10), function() {
            return Array.from(new Array(10), function() {return null;});
        });
        this.misses = []; // missed coordinates
        this.hits = []; // hit coords -- for marking purposes
        this.ships = [];
    }

    placeShip(startLocation, ship, axis) {
        // startLocation - [2, 2]
        if (axis == 'x') {
            if (startLocation[1] >= 0 && startLocation[1] + ship.length <= 10) {
                let i = 0;
                let tempLocation = startLocation;

                while (i < ship.length) {
                    this.grid[tempLocation[0]][tempLocation[1]] = ship;

                    tempLocation[1]++;
                    i++;
                }
            }
        } else if (axis == 'y') {
            if (startLocation[0] >= 0 && startLocation[0] + ship.length <= 10) {
                let i = 0;
                let tempLocation = startLocation;

                while (i < ship.length) {
                    this.grid[tempLocation[0]][tempLocation[1]] = ship;

                    tempLocation[0]++;
                    i++;
                }
            }
        }

        this.ships.push(ship);
    }

    receiveAttack(location) {
        // ex. [1, 2] -- check for ship
        if (this.hits.includes(location) || this.misses.includes(location)) {
            return;
        }

        let tempShip = null;

        for (let ship of this.ships) {
            if (ship == this.grid[location[0]][location[1]]) {
                tempShip = ship;
                break;
            }
        }

        if (tempShip != null) {
            tempShip.hit();
            this.hits.push(location);
        } else {
            this.misses.push(location);
        }

        return this.allSunk();
    }

    allSunk() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) return false;
        }

        return true;
    }
}