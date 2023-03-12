import { ColonyShip } from './ships/colony-ship';
import { MiningShip } from './ships/mining-ship';
import { Scout } from './ships/scout';
import { ShipYard } from './ships/ship-yard';
import { InsufficientColonyPoints } from './exceptions';


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

    get shipYards() {
        return this._ships.filter(ship => ship instanceof ShipYard).length;
    }

    incrementEconomicPhase() {
        this._economicPhase++;
    }

    incrementColonyPoints(amount) {
        this._colonyPoints += amount;
    }

    addShip(ship) {
        if (ship.cost > this._colonyPoints) {
            throw new InsufficientColonyPoints();
        }

        this._ships.push(ship);

        this._colonyPoints -= ship.cost;

    }

}

export { ProductionSheet };

