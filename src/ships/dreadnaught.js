import { Ship } from './ship.js';

class Dreadnought extends Ship {
    constructor() {
        super('Dreadnought', 'DN', 24, 3);
    }
}

export { Dreadnought };