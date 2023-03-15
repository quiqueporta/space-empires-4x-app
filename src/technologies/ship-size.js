import { Technology } from './technology.js';

class ShipSize extends Technology {
    constructor() {
        super('Ship Size', {1: 0, 2: 10, 3: 15, 4: 20, 5: 25, 6: 30}, 1, 1, 6);
    }
}

export { ShipSize };