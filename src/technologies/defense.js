import { Technology } from './technology.js';

class Defense extends Technology {
    constructor() {
        super('Defense', {1: 20, 2: 30, 3: 40}, 0, 0, 3);
    }
}

export { Defense };