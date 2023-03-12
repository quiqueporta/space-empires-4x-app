import { Scout } from '../../src/ships/scout.js';


describe('Scout', () => {

    let scout;

    beforeEach(() => {
        scout = new Scout();
    });

    test('it has a name', () => {
        expect(scout.name).toEqual('Scout');
    });

    test('it has a short name', () => {
        expect(scout.shortName).toEqual('SC');
    });

    test('it has a hull size', () => {
        expect(scout.hullSize).toEqual(1);
    });

    test('it has a maintenance cost', () => {
        expect(scout.maintenance).toEqual(1);
    });

    test('it has a cost', () => {
        expect(scout.cost).toEqual(6);
    });

});
