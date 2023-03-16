import Command from './command.js';

class SubtractMaintenancePointsCommand extends Command {
    constructor(receiver) {
        super(receiver);
    }

    execute() {
        this.receiver.applyMaintenance();
    }

    undo() {
        this.receiver.incrementColonyPoints(this.receiver.maintenancePoints);
    }

    toString() {
        return `Subtracted ${this.receiver.maintenancePoints} maintenance point${this.receiver.maintenancePoints > 1 ? 's' : ''}`;
    }
}

export { SubtractMaintenancePointsCommand };