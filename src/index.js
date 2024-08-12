import DomManager from './DomManager.js';
import Player from './Player.js'
import Ship from './ship.js'

let player = new Player(true);
let cpu = new Player(false);

let manager = new DomManager();

player.board.placeShip([2,2], new Ship(5), 'x');
manager.createNewGrid(player.board.grid, player);

cpu.board.placeShip([2,2], new Ship(5), 'y');
manager.createNewGrid(cpu.board.grid, cpu);