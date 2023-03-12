import { Ship } from './ship.js';

class ColonyShip extends Ship {
    constructor() {
        super('Colony Ship', 'CO', 8, 1, 0);
    }
}

export { ColonyShip };