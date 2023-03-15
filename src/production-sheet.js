import { ColonyShip } from './ships/colony-ship';
import { MiningShip } from './ships/mining-ship';
import { Scout } from './ships/scout';
import { ShipYard } from './ships/ship-yard';
import { InsufficientColonyPoints } from './exceptions';
import { ShipSize } from './technologies/ship-size';
import { Attack } from './technologies/attack';


class ProductionSheet {

    constructor() {
        this._economicPhase = 1;
        this._colonyPoints = 0;
        this._ships = [
            new ColonyShip(),
            new ColonyShip(),
            new ColonyShip(),
            new MiningShip(),
            new Scout(),
            new Scout(),
            new Scout(),
            new ShipYard(),
            new ShipYard(),
            new ShipYard(),
            new ShipYard()
        ];
        this._shipSize = new ShipSize();
        this._attack = new Attack();
        this._bidMade = false;
    }

    get attackLevel() {
        return this._attack.currentLevel;
    }

    get colonyPoints() {
        return this._colonyPoints;
    }

    get colonyShips() {
        return this._ships.filter(ship => ship instanceof ColonyShip).length;
    }

    get economicPhase() {
        return this._economicPhase;
    }

    get maintenancePoints() {
        return this._ships.reduce((total, ship) => total + ship.maintenance, 0);
    }

    get miningShips() {
        return this._ships.filter(ship => ship instanceof MiningShip).length;
    }

    get scouts() {
        return this._ships.filter(ship => ship instanceof Scout).length;
    }

    get shipSizeLevel() {
        return this._shipSize.currentLevel;
    }

    get shipYards() {
        return this._ships.filter(ship => ship instanceof ShipYard).length;
    }

    get maintenancePoints () {
        return this._ships.reduce((total, ship) => total + ship.maintenance, 0);
    }

    applyMaintenance() {
        this._colonyPoints -= this.maintenancePoints;
    }

    bid(amount) {
        if (amount > this._colonyPoints) {
            throw new InsufficientColonyPoints();
        }

        this._colonyPoints -= amount;
        this._bidMade = true;
    }

    buyShip(ship) {
        if (ship.cost > this._colonyPoints) {
            throw new InsufficientColonyPoints();
        }
        if (!this._bidMade) {
            throw new BidNotMade();
        }

        this._ships.push(ship);

        this._colonyPoints -= ship.cost;

    }

    decreaseAttack() {
        this._decreateTechnology(this._attack);
    }

    decreaseShipSize() {
        this._decreateTechnology(this._shipSize);
    }

    decrementColonyPoints(amount) {
        this._colonyPoints -= amount;
    }

    decreaseTurn() {
        if (this._economicPhase === 1) {
            return;
        }

        this._economicPhase--;
    }

    increaseAttack() {
        this._increaseTechnology(this._attack);
    }

    increaseShipSize() {
        this._increaseTechnology(this._shipSize);
    }

    increaseTurn() {
        if (this._economicPhase === 20) {
            return;
        }

        this._economicPhase++;
    }

    incrementColonyPoints(amount) {
        this._colonyPoints += amount;
    }

    loseShip(shipType) {
        const shipIndex = this._ships.findIndex(ship => ship instanceof shipType);
        this._ships.splice(shipIndex, 1);
    }

    sellShip(ship) {
        const shipType = ship.constructor;
        this.loseShip(shipType);
        this._colonyPoints += ship.cost;
    }

    _decreateTechnology(technology) {
        if (technology.isAtFirstLevel) {
            return;
        }
        this._colonyPoints += technology.currentCost;
        technology.decreaseLevel();
    }

    _increaseTechnology(technology) {
        if (technology.isAtLastLevel) {
            return;
        }

        if (this._colonyPoints < technology.nextCost) {
            throw new InsufficientColonyPoints();
        }

        technology.increaseLevel();
        this._colonyPoints -= technology.currentCost;
    }

}

export { ProductionSheet };


// this class implements command pattern

// class Command {
//     constructor(receiver) {
//         this.receiver = receiver;
//     }

//     execute() {
//         throw new Error('execute method is not implemented');
//     }

//     undo() {
//         throw new Error('undo method is not implemented');
//     }
// }

// class AddShipCommand extends Command {
//     constructor(receiver, ship) {
//         super(receiver);
//         this.ship = ship;
//     }

//     execute() {
//         this.receiver.addShip(this.ship);
//     }

//     undo() {
//         this.receiver.loseShip(this.ship.constructor);
//     }
// }

// class BidCommand extends Command {
//     constructor(receiver, amount) {
//         super(receiver);
//         this.amount = amount;
//     }

//     execute() {
//         this.receiver.bid(this.amount);
//     }

//     undo() {
//         this.receiver.incrementColonyPoints(this.amount);
//     }
// }

// class FinalizeEconomicPhaseCommand extends Command {
//     constructor(receiver) {
//         super(receiver);
//     }

//     execute() {
//         this.receiver.finalizeEconomicPhase();
//     }

//     undo() {
//         this.receiver._economicPhase--;
//     }
// }

// class IncrementColonyPointsCommand extends Command {
//     constructor(receiver, amount) {
//         super(receiver);
//         this.amount = amount;
//     }

//     execute() {
//         this.receiver.incrementColonyPoints(this.amount);
//     }

//     undo() {
//         this.receiver.incrementColonyPoints(-this.amount);
//     }
// }

// class LoseShipCommand extends Command {
//     constructor(receiver, shipType) {
//         super(receiver);
//         this.shipType = shipType;
//     }

//     execute() {
//         this.receiver.loseShip(this.shipType);
//     }

//     undo() {
//         this.receiver._ships.push(new this.shipType());
//     }
// }

// class ProductionSheetCommandInvoker {
//     constructor() {
//         this._commands = [];
//         this._currentCommandIndex = -1;
//     }

//     addCommand(command) {
//         this._commands.push(command);
//         this._currentCommandIndex++;
//     }

//     executeCommand() {
//         const command = this._commands[this._currentCommandIndex];
//         command.execute();
//     }

//     undoCommand() {
//         const command = this._commands[this._currentCommandIndex];
//         command.undo();
//         this._currentCommandIndex--;
//     }
// }

// const addShipCommand = new AddShipCommand(productionSheet, new ColonyShip());
// const bidCommand = new BidCommand(productionSheet, 10);
// const finalizeEconomicPhaseCommand = new FinalizeEconomicPhaseCommand(productionSheet);
// const incrementColonyPointsCommand = new IncrementColonyPointsCommand(productionSheet, 10);
// const loseShipCommand = new LoseShipCommand(productionSheet, ColonyShip);

// const productionSheetCommandInvoker = new ProductionSheetCommandInvoker();
// productionSheetCommandInvoker.addCommand(addShipCommand);
// productionSheetCommandInvoker.addCommand(bidCommand);
// productionSheetCommandInvoker.addCommand(finalizeEconomicPhaseCommand);
// productionSheetCommandInvoker.addCommand(incrementColonyPointsCommand);
// productionSheetCommandInvoker.addCommand(loseShipCommand);

// productionSheetCommandInvoker.executeCommand();
// productionSheetCommandInvoker.executeCommand();
// productionSheetCommandInvoker.executeCommand();
// productionSheetCommandInvoker.executeCommand();
// productionSheetCommandInvoker.executeCommand();

// console.log(productionSheet.colonyPoints);
