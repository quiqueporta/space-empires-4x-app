import Command from './command.js';

class BuyShipCommand extends Command {
    constructor(receiver, ship) {
        super(receiver);
        this.ship = ship;
    }

    execute() {
        this.receiver.buyShip(this.ship);
    }

    undo() {
        this.receiver.sellShip(this.ship);
    }

    toString() {
        return `${this.ship.name} purchased`;
    }
}

export { BuyShipCommand };