import { Ship } from './ship.js';

class Miner extends Ship {
    constructor() {
        super('Mining Ship', 'Miner', 5, 0, 1);
    }
}

export { Miner };