import { Decoy } from '../../src/ships/decoy.js';


describe('Decoy', () => {

    let decoy;

    beforeEach(() => {
        decoy = new Decoy();
    });

    test('it has a name', () => {
        expect(decoy.name).toEqual('Decoy');
    });

    test('it has a short name', () => {
        expect(decoy.shortName).toEqual('Decoy');
    });

    test('it has a hull size', () => {
        expect(decoy.hullSize).toEqual(0);
    });

    test('it has a maintenance cost', () => {
        expect(decoy.maintenance).toEqual(0);
    });

    test('it has a cost', () => {
        expect(decoy.cost).toEqual(1);
    });

});
