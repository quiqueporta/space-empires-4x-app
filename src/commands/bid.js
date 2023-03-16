import Command from './command.js';

class BidCommand extends Command {
    constructor(receiver, amount) {
        super(receiver);
        this.amount = amount;
    }

    execute() {
        this.receiver.bid(this.amount);
    }

    undo() {
        this.receiver.incrementColonyPoints(this.amount);
    }

    toString() {
        return `Bid of ${this.amount} point${this.amount > 1 ? 's' : ''} made`;
    }
}

export { BidCommand };