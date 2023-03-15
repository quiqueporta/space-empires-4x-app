import { Ship } from './ship.js';

class Base extends Ship {
    constructor() {
        super('Base', 'Base', 12, 0);
    }
}

export { Base };