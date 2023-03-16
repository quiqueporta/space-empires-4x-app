import { AddColonyPointsCommand } from './add-colony-points';

class AddPipelinePointsCommand extends AddColonyPointsCommand {
    constructor(receiver, amount) {
        super(receiver, amount);
    }

    toString() {
        return `Added ${this.amount} pipeline point${this.amount > 1 ? 's' : ''}`;
    }
}

export { AddPipelinePointsCommand };