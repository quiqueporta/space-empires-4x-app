import { Cruiser } from '../../src/ships/cruiser.js';


describe('Cruiser', () => {

    let cruiser;

    beforeEach(() => {
        cruiser = new Cruiser();
    });

    test('it has a name', () => {
        expect(cruiser.name).toEqual('Cruiser');
    });

    test('it has a short name', () => {
        expect(cruiser.shortName).toEqual('CA');
    });

    test('it has a hull size', () => {
        expect(cruiser.hullSize).toEqual(2);
    });

    test('it has a maintenance cost', () => {
        expect(cruiser.maintenance).toEqual(2);
    });

    test('it has a cost', () => {
        expect(cruiser.cost).toEqual(12);
    });

});
