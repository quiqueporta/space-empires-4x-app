import { Exploration } from "../../src/technologies/exploration";

describe("Exploration", () => {

    let exploration;

    beforeEach(() => {
        exploration = new Exploration();
    });

    test("it has a name", () => {
        expect(exploration.name).toEqual('Exploration');
    });

    test("it starts at level 0", () => {
        expect(exploration.currentLevel).toEqual(0);
    });

    test("it can be increased", () => {
        exploration.increaseLevel();
        expect(exploration.currentLevel).toEqual(1);
    });

    test("it cannot be increased above 1", () => {
        exploration.increaseLevel();
        exploration.increaseLevel();
        expect(exploration.currentLevel).toEqual(1);
    });

    test("it can be decreased", () => {
        exploration.increaseLevel();
        exploration.decreaseLevel();
        expect(exploration.currentLevel).toEqual(0);
    });

    test("it cannot be decreased below 0", () => {
        exploration.decreaseLevel();
        expect(exploration.currentLevel).toEqual(0);
    });

    test("it has a cost of 15 colony points for level 1", () => {
        exploration.increaseLevel();
        expect(exploration.currentCost).toEqual(15);
    });

    test("it returns the cost for the next level", () => {
        expect(exploration.nextCost).toEqual(15);
    });

    test("it returns the cost as zero for the last level", () => {
        exploration.increaseLevel();
        expect(exploration.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(exploration.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        exploration.increaseLevel();
        expect(exploration.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(exploration.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        exploration.increaseLevel();
        expect(exploration.isAtFirstLevel).toEqual(false);
    });

});