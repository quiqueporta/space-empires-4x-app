import { AddColonyPointsCommand } from './add-colony-points';

class AddMineralPointsCommand extends AddColonyPointsCommand {
    constructor(receiver, amount) {
        super(receiver, amount);
    }

    toString() {
        return `Added ${this.amount} mineral point${this.amount > 1 ? 's' : ''}`;
    }
}

export { AddMineralPointsCommand };