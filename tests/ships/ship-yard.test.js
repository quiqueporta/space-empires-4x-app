import { ShipYard } from '../../src/ships/ship-yard.js';


describe('ShipYard', () => {

    let shipYard;

    beforeEach(() => {
        shipYard = new ShipYard();
    });

    test('it has a name', () => {
        expect(shipYard.name).toEqual('Ship Yard');
    });

    test('it has a short name', () => {
        expect(shipYard.shortName).toEqual('SY');
    });

    test('it has a hull size', () => {
        expect(shipYard.hullSize).toEqual(1);
    });

    test('it has a maintenance cost', () => {
        expect(shipYard.maintenance).toEqual(0);
    });

    test('it has a cost', () => {
        expect(shipYard.cost).toEqual(6);
    });

});
