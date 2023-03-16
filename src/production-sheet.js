import { ColonyShip } from './ships/colony-ship';
import { Miner } from './ships/miner';
import { Scout } from './ships/scout';
import { Base } from './ships/base';
import { ShipYard } from './ships/ship-yard';
import { InsufficientColonyPoints, InsufficientShipSizeLevel, BidNotMade } from './exceptions';
import { ShipSize } from './technologies/ship-size';
import { Attack } from './technologies/attack';
import { Defense } from './technologies/defense';
import { Tactics } from './technologies/tactics';
import { Move } from './technologies/move';
import { ShipYards } from './technologies/ship-yards';
import { Terraforming } from './technologies/terraforming';
import { Exploration } from './technologies/exploration';


class ProductionSheet {

    constructor() {
        this._economicPhase = 1;
        this._colonyPoints = 0;
        this._ships = [
            new ColonyShip(),
            new ColonyShip(),
            new ColonyShip(),
            new Miner(),
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
        this._defense = new Defense();
        this._tactics = new Tactics();
        this._move = new Move();
        this._shipYards = new ShipYards();
        this._terraforming = new Terraforming();
        this._exploration = new Exploration();
        this._bidMade = false;
    }

    get attackLevel() {
        return this._attack.currentLevel;
    }

    get bases() {
        return this._getShipCount(Base);
    }

    get colonyPoints() {
        return this._colonyPoints;
    }

    get colonyShips() {
        return this._getShipCount(ColonyShip);
    }

    get defenseLevel() {
        return this._defense.currentLevel;
    }

    get economicPhase() {
        return this._economicPhase;
    }

    get explorationLevel() {
        return this._exploration.currentLevel;
    }

    get isBidMade() {
        return this._bidMade;
    }

    get maintenancePoints() {
        return this._ships.reduce((total, ship) => total + ship.maintenance, 0);
    }

    get miners() {
        return this._getShipCount(Miner);
    }

    get moveLevel() {
        return this._move.currentLevel;
    }

    get scouts() {
        return this._getShipCount(Scout);
    }

    get shipSizeLevel() {
        return this._shipSize.currentLevel;
    }

    get shipYards() {
        return this._getShipCount(ShipYard);
    }

    get shipYardsLevel() {
        return this._shipYards.currentLevel;
    }

    get tacticsLevel() {
        return this._tactics.currentLevel;
    }

    get terraformingLevel() {
        return this._terraforming.currentLevel;
    }

    applyMaintenance() {
        this.decrementColonyPoints(this.maintenancePoints);
    }

    bid(amount) {
        if (amount > this._colonyPoints) {
            throw new InsufficientColonyPoints();
        }

        this.decrementColonyPoints(amount);
        this._bidMade = true;
    }

    buyShip(ship) {
        if (!this._bidMade) {
            throw new BidNotMade();
        }

        if (this._shipSize.currentLevel < ship.requiredShipSizeLevel) {
            throw new InsufficientShipSizeLevel();
        }

        if (ship.cost > this._colonyPoints) {
            throw new InsufficientColonyPoints();
        }

        this._ships.push(ship);

        this.decrementColonyPoints(ship.cost);

    }

    decreaseAttack() {
        this._decreateTechnology(this._attack);
    }

    decreaseDefense() {
        this._decreateTechnology(this._defense);
    }

    decreaseExploration() {
        this._decreateTechnology(this._exploration);
    }

    decreaseMove() {
        this._decreateTechnology(this._move);
    }

    decreaseShipSize() {
        this._decreateTechnology(this._shipSize);
    }

    decreaseShipYards() {
        this._decreateTechnology(this._shipYards);
    }

    decreaseTactics() {
        this._decreateTechnology(this._tactics);
    }

    decreaseTerraforming() {
        this._decreateTechnology(this._terraforming);
    }

    decreaseTurn() {
        if (this._economicPhase === 1) {
            return;
        }

        this._economicPhase--;
    }

    decrementColonyPoints(amount) {
        this._colonyPoints -= amount;
    }

    increaseAttack() {
        this._increaseTechnology(this._attack);
    }

    increaseDefense() {
        this._increaseTechnology(this._defense);
    }

    increaseExploration() {
        this._increaseTechnology(this._exploration);
    }

    increaseMove() {
        this._increaseTechnology(this._move);
    }

    increaseShipSize() {
        this._increaseTechnology(this._shipSize);
    }

    increaseShipYards() {
        this._increaseTechnology(this._shipYards);
    }

    increaseTactics() {
        this._increaseTechnology(this._tactics);
    }

    increaseTerraforming() {
        this._increaseTechnology(this._terraforming);
    }

    increaseTurn() {
        if (this._economicPhase === 20) {
            return;
        }

        this._economicPhase++;
        this._bidMade = false;
    }

    incrementColonyPoints(amount) {
        this._colonyPoints += amount;
    }

    loseShip(ship) {
        const index = this._ships.findIndex(s => s instanceof ship.constructor);
        this._ships.splice(index, 1);
    }

    sellShip(ship) {
        this.loseShip(ship);
        this.incrementColonyPoints(ship.cost);
    }

    _decreateTechnology(technology) {
        if (technology.isAtFirstLevel) {
            return;
        }
        this.incrementColonyPoints(technology.currentCost);
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
        this.decrementColonyPoints(technology.currentCost);
    }

    _getShipCount(shipType) {
        return this._ships.filter(ship => ship instanceof shipType).length;
    }

}

export { ProductionSheet };
