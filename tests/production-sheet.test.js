import { ProductionSheet } from "../src/production-sheet";
import { ColonyShip } from "../src/ships/colony-ship";
import { Cruiser } from "../src/ships/cruiser";
import { Scout } from "../src/ships/scout";
import { InsufficientColonyPoints, NoBidMade, InsufficientShipSizeLevel } from "../src/exceptions";

describe("ProductionSheet", () => {
    let productionSheet;

    beforeEach(() => {
        productionSheet = new ProductionSheet();
    });

    describe("Economic Phase", () => {

        test("it starts with the first economic phase", () => {
            expect(productionSheet.economicPhase).toEqual(1);
        });

        test("it can be incremented", () => {
            productionSheet.increaseTurn();
            expect(productionSheet.economicPhase).toEqual(2);
        });

        test("it cannot be incremented above 20", () => {
            for (let i = 0; i < 20; i++) {
                productionSheet.increaseTurn();
            }
            productionSheet.increaseTurn();
            expect(productionSheet.economicPhase).toEqual(20);
        });

        test("it can be decreased", () => {
            productionSheet.increaseTurn();
            productionSheet.decreaseTurn();
            expect(productionSheet.economicPhase).toEqual(1);
        });

        test("it cannot be decreased below 1", () => {
            productionSheet.decreaseTurn();
            expect(productionSheet.economicPhase).toEqual(1);
        });

        test("it resets the bidMade flag when the economic phase is increased", () => {
            productionSheet.bid(0);
            productionSheet.increaseTurn();
            expect(productionSheet.isBidMade).toEqual(false);
        });

    });

    describe("Colony Points", () => {

        test("it starts with 0 colony points", () => {
            expect(productionSheet.colonyPoints).toEqual(0);
        });

        test("it can be incremented", () => {
            productionSheet.incrementColonyPoints(20);
            expect(productionSheet.colonyPoints).toEqual(20);
        });

        test("it can be decremented", () => {
            productionSheet.incrementColonyPoints(20);
            productionSheet.decrementColonyPoints(10);
            expect(productionSheet.colonyPoints).toEqual(10);
        });

    });

    describe("Maintenance Points", () => {

        test("it starts with 3 maintenance points due to the Scouts", () => {
            expect(productionSheet.maintenancePoints).toEqual(3);
        });

    });

    describe("Ships", () => {

        test("it starts with 3 ColonyShips", () => {
            expect(productionSheet.colonyShips).toEqual(3);
        });

        test("it starts with 1 Miner", () => {
            expect(productionSheet.miners).toEqual(1);
        });

        test("it starts with 3 Scouts", () => {
            expect(productionSheet.scouts).toEqual(3);
        });

        test("it starts with 4 Ship Yards", () => {
            expect(productionSheet.shipYards).toEqual(4);
        });

        test("it buy a ship", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.bid(0);
            productionSheet.buyShip(new ColonyShip());
            expect(productionSheet.colonyShips).toEqual(4);
        });

        test("it decreases the colony points when a ship is bought", () => {
            productionSheet.incrementColonyPoints(8);
            productionSheet.bid(0);
            productionSheet.buyShip(new ColonyShip());
            expect(productionSheet.colonyPoints).toEqual(0);
        });

        test("it throws an error if there are not enough colony points to buy a ship", () => {
            expect(() => {
                productionSheet.buyShip(new ColonyShip());
            }).toThrow(InsufficientColonyPoints);
        });

        test("it throws an exception if the ShipSize technology is not high enough to buy a ship", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.bid(0);
            expect(() => {
                productionSheet.buyShip(new Cruiser());
            }).toThrow(InsufficientShipSizeLevel);
        });

        test("it can sell a ship", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.bid(0);
            productionSheet.buyShip(new ColonyShip());
            productionSheet.sellShip(new ColonyShip());
            expect(productionSheet.colonyShips).toEqual(3);
        });

        test("it can lose a ship", () => {
            productionSheet.loseShip(Scout);
            expect(productionSheet.scouts).toEqual(2);
        });

        test("it does nothing if no ship to lose", () => {
            productionSheet.loseShip(Cruiser);
            expect(productionSheet.maintenancePoints).toEqual(3);
        });

        test("it throws an exception when buying a ship until you pay the maintenance points", () => {
            productionSheet.incrementColonyPoints(10);
            expect(() => {
                productionSheet.buyShip(new Scout());
            }).toThrow(NoBidMade);
        });

    });

    describe("Technologies", () => {

        describe("Ship Size", () => {

            test("it starts with 1", () => {
                expect(productionSheet.shipSizeLevel).toEqual(1);
            });

            test("it can be increased", () => {
                productionSheet.incrementColonyPoints(10);
                productionSheet.increaseShipSize();
                expect(productionSheet.shipSizeLevel).toEqual(2);
                expect(productionSheet.colonyPoints).toEqual(0);
            });

            test("it throws an error if there are not enough colony points to increase", () => {
                expect(() => {
                    productionSheet.increaseShipSize();
                }).toThrow(InsufficientColonyPoints);
            });

            test("it can be decreased", () => {
                productionSheet.incrementColonyPoints(10);
                productionSheet.increaseShipSize();
                productionSheet.decreaseShipSize();
                expect(productionSheet.shipSizeLevel).toEqual(1);
                expect(productionSheet.colonyPoints).toEqual(10);
            });

            test("it cannot be decreased below 1", () => {
                productionSheet.incrementColonyPoints(10);
                productionSheet.decreaseShipSize();
                expect(productionSheet.shipSizeLevel).toEqual(1);
                expect(productionSheet.colonyPoints).toEqual(10);
            });

            test("it cannot be increased above 6", () => {
                productionSheet.incrementColonyPoints(100);
                for (let i = 0; i < 6; i++) {
                    productionSheet.increaseShipSize();
                }
                productionSheet.increaseShipSize();
                expect(productionSheet.shipSizeLevel).toEqual(6);
                expect(productionSheet.colonyPoints).toEqual(0);
            });

        });

        describe("Attack", () => {

            test("it starts with 0", () => {
                expect(productionSheet.attackLevel).toEqual(0);
            });

            test("it can be increased", () => {
                productionSheet.incrementColonyPoints(20);
                productionSheet.increaseAttack();
                expect(productionSheet.attackLevel).toEqual(1);
                expect(productionSheet.colonyPoints).toEqual(0);
            });

            test("it throws an error if there are not enough colony points to increase", () => {
                expect(() => {
                    productionSheet.increaseAttack();
                }).toThrow(InsufficientColonyPoints);
            });

            test("it can be decreased", () => {
                productionSheet.incrementColonyPoints(20);
                productionSheet.increaseAttack();
                productionSheet.decreaseAttack();
                expect(productionSheet.attackLevel).toEqual(0);
                expect(productionSheet.colonyPoints).toEqual(20);
            });

            test("it cannot be decreased below 0", () => {
                productionSheet.incrementColonyPoints(20);
                productionSheet.decreaseAttack();
                expect(productionSheet.attackLevel).toEqual(0);
                expect(productionSheet.colonyPoints).toEqual(20);
            });

            test("it cannot be increased above 3", () => {
                productionSheet.incrementColonyPoints(90);
                for (let i = 0; i < 3; i++) {
                    productionSheet.increaseAttack();
                }
                productionSheet.increaseAttack();
                expect(productionSheet.attackLevel).toEqual(3);
                expect(productionSheet.colonyPoints).toEqual(0);
            });

        });

    });

    describe("Bid", () => {

        test("it can make a bid", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.bid(10);
            expect(productionSheet.colonyPoints).toEqual(90);
        });

        test("it throws an exception when there are not enough colony points to make a bid", () => {
            productionSheet.incrementColonyPoints(10);
            expect(() => {
                productionSheet.bid(11);
            }).toThrow(InsufficientColonyPoints);
        });

    });

    describe("Maintenance", () => {

        test("it returns the maintenance points", () => {
            expect(productionSheet.maintenancePoints).toEqual(3);
        });

        test("it can apply maintenance", () => {
            productionSheet.incrementColonyPoints(10);
            productionSheet.applyMaintenance();
            expect(productionSheet.colonyPoints).toEqual(7);
        });
    });

});