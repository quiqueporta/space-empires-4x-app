import { Ship } from './ship.js';

class Cruiser extends Ship {
    constructor() {
        super('Cruiser', 'CA', 12, 2, 3);
    }
}

export { Cruiser };