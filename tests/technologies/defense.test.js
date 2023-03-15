import { Defense } from "../../src/technologies/defense";

describe("Defense", () => {

    let defense;

    beforeEach(() => {
        defense = new Defense();
    });

    test("it has a name", () => {
        expect(defense.name).toEqual('Defense');
    });

    test("it starts at level 0", () => {
        expect(defense.currentLevel).toEqual(0);
    });

    test("it can be increased", () => {
        defense.increaseLevel();
        expect(defense.currentLevel).toEqual(1);
    });

    test("it cannot be increased above 3", () => {
        for (let i = 0; i < 3; i++) {
            defense.increaseLevel();
        }
        defense.increaseLevel();
        expect(defense.currentLevel).toEqual(3);
    });

    test("it can be decreased", () => {
        defense.increaseLevel();
        defense.decreaseLevel();
        expect(defense.currentLevel).toEqual(0);
    });

    test("it cannot be decreased below 0", () => {
        defense.decreaseLevel();
        expect(defense.currentLevel).toEqual(0);
    });

    test("it has a cost of 20 colony points for level 1", () => {
        defense.increaseLevel();
        expect(defense.currentCost).toEqual(20);
    });

    test("it has a cost of 30 colony points for level 2", () => {
        defense.increaseLevel();
        defense.increaseLevel();
        expect(defense.currentCost).toEqual(30);
    });

    test("it has a cost of 30 colony points for level 3", () => {
        defense.increaseLevel();
        defense.increaseLevel();
        defense.increaseLevel();
        expect(defense.currentCost).toEqual(40);
    });

    test("it returns the cost for the next level", () => {
        expect(defense.nextCost).toEqual(20);
    });

    test("it returns the cost as zero for the last level", () => {
        defense.increaseLevel();
        defense.increaseLevel();
        defense.increaseLevel();
        expect(defense.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(defense.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        defense.increaseLevel();
        defense.increaseLevel();
        defense.increaseLevel();
        expect(defense.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(defense.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        defense.increaseLevel();
        expect(defense.isAtFirstLevel).toEqual(false);
    });

});