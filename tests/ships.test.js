import { ColonyShip } from '../src/ships/colony-ship.js';
import { ShipYard } from '../src/ships/ship-yard.js';
import { Miner } from '../src/ships/miner.js';
import { Decoy } from '../src/ships/decoy.js';
import { Scout } from '../src/ships/scout.js';
import { Destroyer } from '../src/ships/destroyer.js';
import { Base } from '../src/ships/base.js';
import { Cruiser } from '../src/ships/cruiser.js';
import { Battlecruiser } from '../src/ships/battlecruiser.js';
import { Battleship } from '../src/ships/battleship.js';
import { Dreadnought } from '../src/ships/dreadnaught.js';
import { MSPipeline } from '../src/ships/ms-pipeline.js';

function testShip(shipType, shipName, shipShortName, shipCost, shipMaintenance, requiredShipSizeLevel) {
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

    test('it has a maintenance cost', () => {
        expect(ship.maintenance).toEqual(shipMaintenance);
    });

    test('it has a cost', () => {
        expect(ship.cost).toEqual(shipCost);
    });

    test('it has a required ship size level', () => {
        expect(ship.requiredShipSizeLevel).toEqual(requiredShipSizeLevel);
    });

}

testShip(ColonyShip, 'Colony Ship', 'CO', 8, 0, 1);
testShip(ShipYard, 'Ship Yard', 'SY', 6, 0, 1);
testShip(Miner, 'Mining Ship', 'Miner', 5, 0, 1);
testShip(Decoy, 'Decoy', 'Decoy', 1, 0, 1);
testShip(Scout, 'Scout', 'SC', 6, 1, 1);
testShip(Destroyer, 'Destroyer', 'DD', 9, 1, 2);
testShip(Base, 'Base', 'Base', 12, 0, 2);
testShip(Cruiser, 'Cruiser', 'CA', 12, 2, 3);
testShip(Battlecruiser, 'Battlecruiser', 'BC', 15, 2, 4);
testShip(Battleship, 'Battleship', 'BB', 20, 3, 5);
testShip(Dreadnought, 'Dreadnought', 'DN', 24, 3, 6);
testShip(MSPipeline, 'MS Pipeline', 'MS', 3, 0, 1);
