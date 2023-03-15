import { Ship } from './ship.js';

class Scout extends Ship {
    constructor() {
        super('Scout', 'SC', 6, 1);
    }
}

export { Scout };