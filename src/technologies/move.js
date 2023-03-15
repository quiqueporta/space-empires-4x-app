import { Technology } from './technology.js';

class Move extends Technology {
    constructor() {
        super('Move', {1: 0, 2: 20, 3: 30, 4: 40, 5: 40, 6: 40}, 1, 1, 6);
    }
}

export { Move };