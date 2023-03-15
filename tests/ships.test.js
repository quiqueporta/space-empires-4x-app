import { ColonyShip } from '../src/ships/colony-ship.js';
import { ShipYard } from '../src/ships/ship-yard.js';
import { MiningShip } from '../src/ships/mining-ship.js';
import { Decoy } from '../src/ships/decoy.js';
import { Scout } from '../src/ships/scout.js';
import { Destroyer } from '../src/ships/destroyer.js';
import { Base } from '../src/ships/base.js';
import { Cruiser } from '../src/ships/cruiser.js';
import { Battlecruiser } from '../src/ships/battlecruiser.js';
import { Battleship } from '../src/ships/battleship.js';
import { Dreadnought } from '../src/ships/dreadnaught.js';
import { MSPipeline } from '../src/ships/ms-pipeline.js';

function testShip(shipType, shipName, shipShortName, shipCost, shipHullSize, shipMaintenance) {
    let ship;

    beforeEach(() => {
        ship = new shipType();
    });

    test('it has a name', () => {
        expect(ship.name).toEqual(shipName);
    });

    test('it has a short name', () => {
        expect(ship.shortName).toEqual(shipShortName);
    });

    test('it has a hull size', () => {
        expect(ship.hullSize).toEqual(shipHullSize);
    });

    test('it has a maintenance cost', () => {
        expect(ship.maintenance).toEqual(shipMaintenance);
    });

    test('it has a cost', () => {
        expect(ship.cost).toEqual(shipCost);
    });
}

testShip(ColonyShip, 'Colony Ship', 'CO', 8, 1, 0);
testShip(ShipYard, 'Ship Yard', 'SY', 6, 1, 0);
testShip(MiningShip, 'Mining Ship', 'Miner', 5, 1, 0);
testShip(Decoy, 'Decoy', 'Decoy', 1, 0, 0);
testShip(Scout, 'Scout', 'SC', 6, 1, 1);
testShip(Destroyer, 'Destroyer', 'DD', 9, 1, 1);
testShip(Base, 'Base', 'Base', 12, 3, 0);
testShip(Cruiser, 'Cruiser', 'CA', 12, 2, 2);
testShip(Battlecruiser, 'Battlecruiser', 'BC', 15, 1, 2);
testShip(Battleship, 'Battleship', 'BB', 20, 2, 3);
testShip(Dreadnought, 'Dreadnought', 'DN', 24, 3, 3);
testShip(MSPipeline, 'MS Pipeline', 'MS', 3, 1, 0);
