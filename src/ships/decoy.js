import { Ship } from './ship';


class Decoy extends Ship {
    constructor() {
        super('Decoy', 'Decoy', 1, 0, 0);
    }
}

export { Decoy };