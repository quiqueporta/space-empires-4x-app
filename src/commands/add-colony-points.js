import Command from './command.js';

class AddColonyPointsCommand extends Command {
    constructor(receiver, amount) {
        super(receiver);
        this.amount = amount;
    }

    execute() {
        this.receiver.incrementColonyPoints(this.amount);
    }

    undo() {
        this.receiver.decrementColonyPoints(this.amount);
    }

    toString() {
        return `Added ${this.amount} colony points`;
    }

}

export { AddColonyPointsCommand };