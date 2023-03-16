// this file test the BuyShipCommand

import { BuyShipCommand } from '../src/commands/buy-ship.js';
import { ProductionSheet } from "../src/production-sheet";
import { Scout } from '../src/ships/scout.js';
import { BidCommand } from '../src/commands/bid.js';
import { AddColonyPointsCommand } from '../src/commands/add-colony-points.js';
import { AddPipelinePointsCommand } from '../src/commands/add-pipeline-points.js';
import { AddMineralPointsCommand } from '../src/commands/add-mineral-points.js';
import { SubtractMaintenancePointsCommand } from '../src/commands/subtract-maintenance-points.js';


describe('Commands', () => {

    let productionSheet;

    beforeEach(() => {
        productionSheet = new ProductionSheet();
        productionSheet.incrementColonyPoints(100);
        productionSheet.bid(0);
    });

    describe('BuyShip command', () => {
        test("it can execute and undo", () => {
            let buyShipCommand = new BuyShipCommand(productionSheet, new Scout());
            buyShipCommand.execute();
            expect(productionSheet.scouts).toEqual(4);
            buyShipCommand.undo();
            expect(productionSheet.scouts).toEqual(3);
        });

        test("it has a string representation", () => {
            let buyShipCommand = new BuyShipCommand(productionSheet, new Scout());
            expect(buyShipCommand.toString()).toEqual("Scout purchased");
        });
    });

    describe('Bid command', () => {
        test("it can execute and undo", () => {
            let bidCommand = new BidCommand(productionSheet, 10);
            bidCommand.execute();
            expect(productionSheet.colonyPoints).toEqual(90);
            bidCommand.undo();
            expect(productionSheet.colonyPoints).toEqual(100);
        });

        test("it has a string representation", () => {
            let bidCommand = new BidCommand(productionSheet, 1);
            expect(bidCommand.toString()).toEqual("Bid of 1 point made");
            bidCommand = new BidCommand(productionSheet, 10);
            expect(bidCommand.toString()).toEqual("Bid of 10 points made");
        });

    });

    describe('AddColonyPoints command', () => {
        test("it can execute and undo", () => {
            let addColonyPointsCommand = new AddColonyPointsCommand(productionSheet, 10);
            addColonyPointsCommand.execute();
            expect(productionSheet.colonyPoints).toEqual(110);
            addColonyPointsCommand.undo();
            expect(productionSheet.colonyPoints).toEqual(100);
        });

        test("it has a string representation", () => {
            let addColonyPointsCommand = new AddColonyPointsCommand(productionSheet, 10);
            expect(addColonyPointsCommand.toString()).toEqual("Added 10 colony points");
        });

    });

    describe('AddPipelinePoints command', () => {
        test("it can execute and undo", () => {
            let addPipelinePointsCommand = new AddPipelinePointsCommand(productionSheet, 1);
            addPipelinePointsCommand.execute();
            expect(productionSheet.colonyPoints).toEqual(101);
            addPipelinePointsCommand.undo();
            expect(productionSheet.colonyPoints).toEqual(100);
        });

        test("it has a string representation", () => {
            let addPipelinePointsCommand = new AddPipelinePointsCommand(productionSheet, 1);
            expect(addPipelinePointsCommand.toString()).toEqual("Added 1 pipeline point");
            addPipelinePointsCommand = new AddPipelinePointsCommand(productionSheet, 2);
            expect(addPipelinePointsCommand.toString()).toEqual("Added 2 pipeline points");
        });

    });

    describe('AddMineralPoints command', () => {
        test("it can execute and undo", () => {
            let addMineralPointsCommand = new AddMineralPointsCommand(productionSheet, 5);
            addMineralPointsCommand.execute();
            expect(productionSheet.colonyPoints).toEqual(105);
            addMineralPointsCommand.undo();
            expect(productionSheet.colonyPoints).toEqual(100);
        });

        test("it has a string representation", () => {
            let addMineralPointsCommand = new AddMineralPointsCommand(productionSheet, 5);
            expect(addMineralPointsCommand.toString()).toEqual("Added 5 mineral points");
        });
});

    describe('SubtractMaintenancePoints command', () => {
        test("it can execute and undo", () => {
            let subtractMaintenancePointsCommand = new SubtractMaintenancePointsCommand(productionSheet);
            subtractMaintenancePointsCommand.execute();
            expect(productionSheet.colonyPoints).toEqual(97);
            subtractMaintenancePointsCommand.undo();
            expect(productionSheet.colonyPoints).toEqual(100);
        });
        test("it has a string representation", () => {
            let subtractMaintenancePointsCommand = new SubtractMaintenancePointsCommand(productionSheet);
            expect(subtractMaintenancePointsCommand.toString()).toEqual("Subtracted 3 maintenance points");
        });
    });

});
