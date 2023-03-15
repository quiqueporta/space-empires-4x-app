import { ShipSize } from "../../src/technologies/ship-size";

describe("Ship Size", () => {

    let shipSize;

    beforeEach(() => {
        shipSize = new ShipSize();
    });

    test("it has a name", () => {
        expect(shipSize.name).toEqual('Ship Size');
    });

    test("it starts with 1", () => {
        expect(shipSize.currentLevel).toEqual(1);
    });

    test("it can be increased", () => {
        shipSize.increaseLevel();
        expect(shipSize.currentLevel).toEqual(2);
    });

    test("it cannot be increased above 6", () => {
        for (let i = 0; i < 6; i++) {
            shipSize.increaseLevel();
        }
        shipSize.increaseLevel();
        expect(shipSize.currentLevel).toEqual(6);
    });

    test("it can be decreased", () => {
        shipSize.increaseLevel();
        shipSize.decreaseLevel();
        expect(shipSize.currentLevel).toEqual(1);
    });

    test("it cannot be decreased below 1", () => {
        shipSize.decreaseLevel();
        expect(shipSize.currentLevel).toEqual(1);
    });

    test("it has a cost of 10 colony points for level 2", () => {
        shipSize.increaseLevel();
        expect(shipSize.currentCost).toEqual(10);
    });

    test("it has a cost of 15 colony points for level 3", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.currentCost).toEqual(15);
    });

    test("it has a cost of 20 colony points for level 4", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.currentCost).toEqual(20);
    });

    test("it has a cost of 25 colony points for level 5", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.currentCost).toEqual(25);
    });

    test("it has a cost of 30 colony points for level 6", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.currentCost).toEqual(30);
    });

    test("it return the cost for the next level", () => {
        expect(shipSize.nextCost).toEqual(10);
    });

    test("it return the cost as zero for the last level", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(shipSize.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        shipSize.increaseLevel();
        expect(shipSize.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(shipSize.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        shipSize.increaseLevel();
        expect(shipSize.isAtFirstLevel).toEqual(false);
    });

});