import { Destroyer } from '../../src/ships/destroyer.js';


describe('Destroyer', () => {

    let destroyer;

    beforeEach(() => {
        destroyer = new Destroyer();
    });

    test('it has a name', () => {
        expect(destroyer.name).toEqual('Destroyer');
    });

    test('it has a short name', () => {
        expect(destroyer.shortName).toEqual('DD');
    });

    test('it has a hull size', () => {
        expect(destroyer.hullSize).toEqual(1);
    });

    test('it has a maintenance cost', () => {
        expect(destroyer.maintenance).toEqual(1);
    });

    test('it has a cost', () => {
        expect(destroyer.cost).toEqual(9);
    });

});
