import { MiningShip } from '../../src/ships/mining-ship.js';


describe('Miner', () => {

    let miningShip;

    beforeEach(() => {
        miningShip = new MiningShip();
    });

    test('it has a name', () => {
        expect(miningShip.name).toEqual('Mining Ship');
    });

    test('it has a short name', () => {
        expect(miningShip.shortName).toEqual('Miner');
    });

    test('it has a hull size', () => {
        expect(miningShip.hullSize).toEqual(1);
    });

    test('it has a maintenance cost', () => {
        expect(miningShip.maintenance).toEqual(0);
    });

    test('it has a cost', () => {
        expect(miningShip.cost).toEqual(5);
    });

});
