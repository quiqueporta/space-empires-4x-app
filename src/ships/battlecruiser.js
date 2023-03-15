import { Ship } from './ship.js';

class Battlecruiser extends Ship {
    constructor() {
        super('Battlecruiser', 'BC', 15, 2);
    }
}

export { Battlecruiser };