import { Ship } from './ship.js';

class MiningShip extends Ship {
    constructor() {
        super('Mining Ship', 'Miner', 5, 1, 0);
    }
}

export { MiningShip };