import { ColonyShip } from '../../src/ships/colony-ship.js';


describe('Colony Ship', () => {

    let colonyShip;

    beforeEach(() => {
        colonyShip = new ColonyShip();
    });

    test('it has a name', () => {
        expect(colonyShip.name).toEqual('Colony Ship');
    });

    test('it has a short name', () => {
        expect(colonyShip.shortName).toEqual('CO');
    });

    test('it has a hull size', () => {
        expect(colonyShip.hullSize).toEqual(1);
    });

    test('it has a maintenance cost', () => {
        expect(colonyShip.maintenance).toEqual(0);
    });

    test('it has a cost', () => {
        expect(colonyShip.cost).toEqual(8);
    });

});
