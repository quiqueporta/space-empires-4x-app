import { Terraforming } from "../../src/technologies/terraforming";

describe("Terraforming", () => {

    let terraforming;

    beforeEach(() => {
        terraforming = new Terraforming();
    });

    test("it has a name", () => {
        expect(terraforming.name).toEqual('Terraforming');
    });

    test("it starts at level 0", () => {
        expect(terraforming.currentLevel).toEqual(0);
    });

    test("it can be increased", () => {
        terraforming.increaseLevel();
        expect(terraforming.currentLevel).toEqual(1);
    });

    test("it cannot be increased above 1", () => {
        terraforming.increaseLevel();
        terraforming.increaseLevel();
        expect(terraforming.currentLevel).toEqual(1);
    });

    test("it can be decreased", () => {
        terraforming.increaseLevel();
        terraforming.decreaseLevel();
        expect(terraforming.currentLevel).toEqual(0);
    });

    test("it cannot be decreased below 0", () => {
        terraforming.decreaseLevel();
        expect(terraforming.currentLevel).toEqual(0);
    });

    test("it has a cost of 25 colony points for level 1", () => {
        terraforming.increaseLevel();
        expect(terraforming.currentCost).toEqual(25);
    });

    test("it returns the cost for the next level", () => {
        expect(terraforming.nextCost).toEqual(25);
    });

    test("it returns the cost as zero for the last level", () => {
        terraforming.increaseLevel();
        expect(terraforming.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(terraforming.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        terraforming.increaseLevel();
        expect(terraforming.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(terraforming.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        terraforming.increaseLevel();
        expect(terraforming.isAtFirstLevel).toEqual(false);
    });

});