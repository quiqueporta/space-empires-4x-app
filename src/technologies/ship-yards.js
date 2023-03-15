import { Technology } from './technology.js';

class ShipYards extends Technology {
    constructor() {
        super('Ship Yards', {1: 0, 2: 20, 3: 30}, 1, 1, 3);
    }
}

export { ShipYards };