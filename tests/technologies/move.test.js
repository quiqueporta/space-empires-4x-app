import { Move } from "../../src/technologies/move";

describe("Move", () => {

    let move;

    beforeEach(() => {
        move = new Move();
    });

    test("it has a name", () => {
        expect(move.name).toEqual('Move');
    });

    test("it starts with 1", () => {
        expect(move.currentLevel).toEqual(1);
    });

    test("it can be increased", () => {
        move.increaseLevel();
        expect(move.currentLevel).toEqual(2);
    });

    test("it cannot be increased above 6", () => {
        for (let i = 0; i < 6; i++) {
            move.increaseLevel();
        }
        move.increaseLevel();
        expect(move.currentLevel).toEqual(6);
    });

    test("it can be decreased", () => {
        move.increaseLevel();
        move.decreaseLevel();
        expect(move.currentLevel).toEqual(1);
    });

    test("it cannot be decreased below 1", () => {
        move.decreaseLevel();
        expect(move.currentLevel).toEqual(1);
    });

    test("it has a cost of 20 colony points for level 2", () => {
        move.increaseLevel();
        expect(move.currentCost).toEqual(20);
    });

    test("it has a cost of 30 colony points for level 3", () => {
        move.increaseLevel();
        move.increaseLevel();
        expect(move.currentCost).toEqual(30);
    });

    test("it has a cost of 40 colony points for level 4", () => {
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        expect(move.currentCost).toEqual(40);
    });

    test("it has a cost of 40 colony points for level 5", () => {
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        expect(move.currentCost).toEqual(40);
    });

    test("it has a cost of 40 colony points for level 6", () => {
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        expect(move.currentCost).toEqual(40);
    });

    test("it returns the cost for the next level", () => {
        expect(move.nextCost).toEqual(20);
    });

    test("it returns the cost as zero for the last level", () => {
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        expect(move.nextCost).toEqual(0);
    });

    test("it returns if it is at the last level", () => {
        expect(move.isAtLastLevel).toEqual(false);
    });

    test("it returns if it is at the last level", () => {
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        move.increaseLevel();
        expect(move.isAtLastLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        expect(move.isAtFirstLevel).toEqual(true);
    });

    test("it returns if it is at the first level", () => {
        move.increaseLevel();
        expect(move.isAtFirstLevel).toEqual(false);
    });

});