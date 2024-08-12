import Ship from './src/ship.js';

const board = require('./src/index.js');

it("Check if ship placement on x axis is correct.", () => {
    const coord = [2, 2];
    let ship = new Ship(5);

    board.placeShip(coord, ship, 'x');
    coord[0] = 2;
    
    for (let i = coord[0]; i < (coord[0] + ship.length); i++) {
        expect(board.grid[i][2] === ship).toBe(true);
    }
});

it("Check if ship placement on y axis is correct.", () => {
    let coord = [2, 2];
    let ship = new Ship(5);

    board.placeShip(coord, ship, 'y');
    coord[1] = 2;

    for (let i = coord[1]; i < (coord[1] + ship.length); i++) {
        expect(board.grid[2][i] === ship).toBe(true);
    }
});