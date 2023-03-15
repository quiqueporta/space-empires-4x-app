import { ColonyShip } from '../src/ships/colony-ship.js';
import { Cruiser } from '../src/ships/cruiser.js';
import { Decoy } from '../src/ships/decoy.js';
import { Destroyer } from '../src/ships/destroyer.js';
import { MiningShip } from '../src/ships/mining-ship.js';
import { Scout } from '../src/ships/scout.js';
import { ShipYard } from '../src/ships/ship-yard.js';


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
testShip(Cruiser, 'Cruiser', 'CA', 12, 2, 2);
testShip(Decoy, 'Decoy', 'Decoy', 1, 0, 0);
testShip(Destroyer, 'Destroyer', 'DD', 9, 1, 1);
testShip(MiningShip, 'Mining Ship', 'Miner', 5, 1, 0);
testShip(Scout, 'Scout', 'SC', 6, 1, 1);
testShip(ShipYard, 'Ship Yard', 'SY', 6, 1, 0);
