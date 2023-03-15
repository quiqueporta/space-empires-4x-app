import { Ship } from './ship.js';

class Battleship extends Ship {
    constructor() {
        super('Battleship', 'BB', 20, 3);
    }
}

export { Battleship };