import { Attack } from "../../src/technologies/attack";

describe("Attack", () => {

    let attack;

    beforeEach(() => {
        attack = new Attack();
    });

    test("it has a name", () => {
        expect(attack.name).toEqual('Attack');
    });

    test("it starts at level 0", () => {
        expect(attack.currentLevel).toEqual(0);
    });

    test("it can be increased", () => {
        attack.increaseLevel();
        expect(attack.currentLevel).toEqual(1);
    });

    test("it cannot be increased above 3", () => {
        for (let i = 0; i < 3; i++) {
            attack.increaseLevel();
        }
        attack.increaseLevel();
        expect(attack.currentLevel).toEqual(3);
    });

    test("it can be decreased", () => {
        attack.increaseLevel();
        attack.decreaseLevel();
        expect(attack.currentLevel).toEqual(0);
    });

    test("it cannot be decreased below 0", () => {
        attack.decreaseLevel();
        expect(attack.currentLevel).toEqual(0);
    });

    test("it has a cost of 20 colony points for level 1", () => {
        attack.increaseLevel();
        expect(attack.currentCost).toEqual(20);
    });

    test("it has a cost of 30 colony points for level 2", () => {
        attack.increaseLevel();
        attack.increaseLevel();
        expect(attack.currentCost).toEqual(30);
    });

    test("it has a cost of 40 colony points for level 3", () => {
        attack.increaseLevel();
        attack.increaseLevel();
        attack.increaseLevel();
        expect(attack.currentCost).toEqual(40);
    });

    test("it returns the cost for the next level", () => {
        expect(attack.nextCost).toEqual(20);
    });

    test("it returns the cost as zero for the last level", () => {
        attack.increaseLevel();
        attack.increaseLevel();
        attack.increaseLevel();
        expect(attack.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(attack.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        attack.increaseLevel();
        attack.increaseLevel();
        attack.increaseLevel();
        expect(attack.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(attack.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        attack.increaseLevel();
        expect(attack.isAtFirstLevel).toEqual(false);
    });

});