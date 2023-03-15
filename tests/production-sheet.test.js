import { ProductionSheet } from "../src/production-sheet";
import { ColonyShip } from "../src/ships/colony-ship";
import { Cruiser } from "../src/ships/cruiser";
import { MiningShip } from "../src/ships/mining-ship";
import { Scout } from "../src/ships/scout";
import { ShipYard } from "../src/ships/ship-yard";
import { InsufficientColonyPoints } from "../src/exceptions";

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

        test("it starts with 1 MiningShip", () => {
            expect(productionSheet.miningShips).toEqual(1);
        });

        test("it starts with 3 Scouts", () => {
            expect(productionSheet.scouts).toEqual(3);
        });

        test("it starts with 4 Ship Yards", () => {
            expect(productionSheet.shipYards).toEqual(4);
        });

        test("it buy add a Colony Ship", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.buyShip(new ColonyShip());
            expect(productionSheet.colonyShips).toEqual(4);
        });

        test("it buy add a Mining Ship", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.buyShip(new MiningShip());
            expect(productionSheet.miningShips).toEqual(2);
        });

        test("it buy add a Scout", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.buyShip(new Scout());
            expect(productionSheet.scouts).toEqual(4);
        });

        test("it buy add a Ship Yard", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.buyShip(new ShipYard());
            expect(productionSheet.shipYards).toEqual(5);
        });

        test("it decreases the colony points when a ship is bought", () => {
            productionSheet.incrementColonyPoints(8);
            productionSheet.buyShip(new ColonyShip());
            expect(productionSheet.colonyPoints).toEqual(0);
        });

        test("it throws an error if there are not enough colony points to buy a ship", () => {
            expect(() => {
                productionSheet.buyShip(new ColonyShip());
            }).toThrow(InsufficientColonyPoints);
        });

        test("it can sell a ship", () => {
            productionSheet.incrementColonyPoints(100);
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

    });

    describe("Bid", () => {

        test("it can make a bid", () => {
            productionSheet.incrementColonyPoints(100);
            productionSheet.bid(10);
            expect(productionSheet.colonyPoints).toEqual(90);
        });

        test("it throws an error if there are not enough colony points to make a bid", () => {
            expect(() => {
                productionSheet.bid(10);
            }).toThrow(InsufficientColonyPoints);
        });

    });

});