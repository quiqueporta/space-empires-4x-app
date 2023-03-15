import { Ship } from './ship.js';

class Destroyer extends Ship {
    constructor() {
        super('Destroyer', 'DD', 9, 1, 2);
    }
}

export { Destroyer };