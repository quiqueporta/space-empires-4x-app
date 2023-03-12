import { Ship } from './ship.js';

class ShipYard extends Ship {
    constructor() {
        super('Ship Yard', 'SY', 6, 1, 0);
    }
}

export { ShipYard };