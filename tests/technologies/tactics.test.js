import { Tactics } from "../../src/technologies/tactics";

describe("Tactics", () => {

    let tactics;

    beforeEach(() => {
        tactics = new Tactics();
    });

    test("it has a name", () => {
        expect(tactics.name).toEqual('Tactics');
    });

    test("it starts at level 0", () => {
        expect(tactics.currentLevel).toEqual(0);
    });

    test("it can be increased", () => {
        tactics.increaseLevel();
        expect(tactics.currentLevel).toEqual(1);
    });

    test("it cannot be increased above 3", () => {
        for (let i = 0; i < 3; i++) {
            tactics.increaseLevel();
        }
        tactics.increaseLevel();
        expect(tactics.currentLevel).toEqual(3);
    });

    test("it can be decreased", () => {
        tactics.increaseLevel();
        tactics.decreaseLevel();
        expect(tactics.currentLevel).toEqual(0);
    });

    test("it cannot be decreased below 0", () => {
        tactics.decreaseLevel();
        expect(tactics.currentLevel).toEqual(0);
    });

    test("it has a cost of 15 colony points for level 1", () => {
        tactics.increaseLevel();
        expect(tactics.currentCost).toEqual(15);
    });

    test("it has a cost of 20 colony points for level 2", () => {
        tactics.increaseLevel();
        tactics.increaseLevel();
        expect(tactics.currentCost).toEqual(20);
    });

    test("it has a cost of 30 colony points for level 3", () => {
        tactics.increaseLevel();
        tactics.increaseLevel();
        tactics.increaseLevel();
        expect(tactics.currentCost).toEqual(30);
    });

    test("it returns the cost for the next level", () => {
        expect(tactics.nextCost).toEqual(15);
    });

    test("it return the cost as zero for the last level", () => {
        tactics.increaseLevel();
        tactics.increaseLevel();
        tactics.increaseLevel();
        expect(tactics.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(tactics.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        tactics.increaseLevel();
        tactics.increaseLevel();
        tactics.increaseLevel();
        expect(tactics.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(tactics.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        tactics.increaseLevel();
        expect(tactics.isAtFirstLevel).toEqual(false);
    });

});