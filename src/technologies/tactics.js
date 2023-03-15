import { Technology } from './technology.js';

class Tactics extends Technology {
    constructor() {
        super('Tactics', {1: 15, 2: 20, 3: 30}, 0, 0, 3);
    }
}

export { Tactics };