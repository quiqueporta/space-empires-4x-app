import { ShipYards } from "../../src/technologies/ship-yards";

describe("ShipYards", () => {

    let shipYards;

    beforeEach(() => {
        shipYards = new ShipYards();
    });

    test("it has a name", () => {
        expect(shipYards.name).toEqual('Ship Yards');
    });

    test("it starts at level 1", () => {
        expect(shipYards.currentLevel).toEqual(1);
    });

    test("it can be increased", () => {
        shipYards.increaseLevel();
        expect(shipYards.currentLevel).toEqual(2);
    });

    test("it cannot be increased above 3", () => {
        for (let i = 0; i < 3; i++) {
            shipYards.increaseLevel();
        }
        shipYards.increaseLevel();
        expect(shipYards.currentLevel).toEqual(3);
    });

    test("it can be decreased", () => {
        shipYards.increaseLevel();
        shipYards.decreaseLevel();
        expect(shipYards.currentLevel).toEqual(1);
    });

    test("it cannot be decreased below 1", () => {
        shipYards.decreaseLevel();
        expect(shipYards.currentLevel).toEqual(1);
    });

    test("it has a cost of 20 colony points for level 2", () => {
        shipYards.increaseLevel();
        expect(shipYards.currentCost).toEqual(20);
    });

    test("it has a cost of 30 colony points for level 3", () => {
        shipYards.increaseLevel();
        shipYards.increaseLevel();
        expect(shipYards.currentCost).toEqual(30);
    });

    test("it returns the cost for the next level", () => {
        expect(shipYards.nextCost).toEqual(20);
    });

    test("it returns the cost as zero for the last level", () => {
        shipYards.increaseLevel();
        shipYards.increaseLevel();
        expect(shipYards.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(shipYards.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        shipYards.increaseLevel();
        shipYards.increaseLevel();
        expect(shipYards.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(shipYards.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        shipYards.increaseLevel();
        expect(shipYards.isAtFirstLevel).toEqual(false);
    });

});