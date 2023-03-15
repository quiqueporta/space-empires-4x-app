import { Technology } from './technology.js';

class Exploration extends Technology {
    constructor() {
        super('Exploration', {1: 15}, 0, 0, 1);
    }
}

export { Exploration };