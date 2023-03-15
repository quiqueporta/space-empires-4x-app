import { Technology } from './technology.js';

class Attack extends Technology {
    constructor() {
        super('Attack', {1: 20, 2: 30, 3: 40}, 0, 0, 3);
    }
}

export { Attack };