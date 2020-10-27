// import { Scout, ShipYard, Miner, ColonyShip, Decoy, Destroyer, Cruiser, BattleCruiser,
//          BattleShip, Dreadnaught, Base,
//          Mine, MineSweeperShip, MSPipeline, Raider, Carrier, FighterOne, FighterTwo, FighterThree
//        } from './ships';


export class AddColonyPointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.increaseConstructionPoints(this._points);
  }

  undo(){
    this._production_sheet.decreaseConstructionPoints(this._points);
  }

  toString() {
    return "Added " + this._points + " Colony Points.";
  }

  toDict() {
    return {
        name: "AddColonyPointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new AddColonyPointsCommand(production_sheet, dict.points);
  }
}


export class AddMineralPointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.increaseConstructionPoints(this._points);
  }

  undo(){
    this._production_sheet.decreaseConstructionPoints(this._points);
  }

  toString() {
    return "Added " + this._points + " Mineral Points.";
  }

  toDict() {
    return {
        name: "AddMineralPointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new AddMineralPointsCommand(production_sheet, dict.points);
  }
}


export class SubtractBidPointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.decreaseConstructionPoints(this._points);
  }

  undo(){
    this._production_sheet.increaseConstructionPoints(this._points);
  }

  toString() {
    return "Subtracted " + this._points + " Bid Points.";
  }

  toDict() {
    return {
        name: "SubtractBidPointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new SubtractBidPointsCommand(production_sheet, dict.points);
  }

}


export class SubtractMaintenancePointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.decreaseConstructionPoints(this._points);
  }

  undo(){
    this._production_sheet.increaseConstructionPoints(this._points);
  }

  toString() {
    return "Subtracted " + this._points + " Maintenance Points.";
  }

  toDict() {
    return {
        name: "SubtractMaintenancePointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new SubtractMaintenancePointsCommand(production_sheet, dict.points);
  }
}


export class EndTurnCommand {
  constructor(production_sheet, turn) {
    this._production_sheet = production_sheet;
    this._turn = turn;
  }

  do() {
    this._production_sheet.increaseTurn();
  }

  undo() {
    this._production_sheet.decreaseTurn();
  }

  toString() {
    return "End turn " + this._turn + " with " + this._production_sheet.constructionPoints + " CPs.";
  }


  toDict() {
    return {
        name: "EndTurnCommand",
        turn: this._turn
    };
  }

  static fromDict(production_sheet, dict) {
    return new EndTurnCommand(production_sheet, dict.turn);
  }
}

export class IncreaseSpaceWreckShipSizeCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckShipSize();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckShipSize();
  }

  toString() {
    return "Ship Size increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckShipSizeCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckShipSizeCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckAttackCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckAttack();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckAttack();
  }

  toString() {
    return "Attack increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckAttackCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckAttackCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckDefenseCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckDefense();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckDefense();
  }

  toString() {
    return "Defense increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckDefenseCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckDefenseCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckTacticsCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckTactics();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckTactics();
  }

  toString() {
    return "Tactics increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckTacticsCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckTacticsCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckMoveCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckMove();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckMove();
  }

  toString() {
    return "Move increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckMoveCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckMoveCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckShipYardsCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckShipYards();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckShipYards();
  }

  toString() {
    return "Ship Yards increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckShipYardsCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckShipYardsCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckTerraformingCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckTerraforming();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckTerraforming();
  }

  toString() {
    return "Terraforming increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckTerraformingCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckTerraformingCommand(production_sheet);
  }
}


export class IncreaseSpaceWreckExplorationCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseSpaceWreckExploration();
  }

  undo(){
    this._production_sheet.decreaseSpaceWreckExploration();
  }

  toString() {
    return "Exploration increased by Space Wreck.";
  }

  toDict() {
    return {
        name: "IncreaseSpaceWreckExplorationCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseSpaceWreckExplorationCommand(production_sheet);
  }
}

export class IncreaseShipSizeCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseShipSize();
  }

  undo(){
    this._production_sheet.decreaseShipSize();
  }

  toString() {
    return "Ship Size increased.";
  }

  toDict() {
    return {
        name: "IncreaseShipSizeCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseShipSizeCommand(production_sheet);
  }
}


export class IncreaseAttackCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseAttack();
  }

  undo(){
    this._production_sheet.decreaseAttack();
  }

  toString() {
    return "Attack increased.";
  }

  toDict() {
    return {
        name: "IncreaseAttackCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseAttackCommand(production_sheet);
  }
}


export class IncreaseDefenseCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseDefense();
  }

  undo(){
    this._production_sheet.decreaseDefense();
  }

  toString() {
    return "Defense increased.";
  }

  toDict() {
    return {
        name: "IncreaseDefenseCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseDefenseCommand(production_sheet);
  }
}


export class IncreaseTacticsCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseTactics();
  }

  undo(){
    this._production_sheet.decreaseTactics();
  }

  toString() {
    return "Tactics increased.";
  }

  toDict() {
    return {
        name: "IncreaseTacticsCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseTacticsCommand(production_sheet);
  }
}


export class IncreaseMoveCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseMove();
  }

  undo(){
    this._production_sheet.decreaseMove();
  }

  toString() {
    return "Move increased.";
  }

  toDict() {
    return {
        name: "IncreaseMoveCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseMoveCommand(production_sheet);
  }
}


export class IncreaseShipYardsCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseShipYards();
  }

  undo(){
    this._production_sheet.decreaseShipYards();
  }

  toString() {
    return "Ship Yards increased.";
  }

  toDict() {
    return {
        name: "IncreaseShipYardsCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseShipYardsCommand(production_sheet);
  }
}


export class IncreaseTerraformingCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseTerraforming();
  }

  undo(){
    this._production_sheet.decreaseTerraforming();
  }

  toString() {
    return "Terraforming increased.";
  }

  toDict() {
    return {
        name: "IncreaseTerraformingCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseTerraformingCommand(production_sheet);
  }
}


export class IncreaseExplorationCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseExploration();
  }

  undo(){
    this._production_sheet.decreaseExploration();
  }

  toString() {
    return "Exploration increased.";
  }

  toDict() {
    return {
        name: "IncreaseExplorationCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseExplorationCommand(production_sheet);
  }
}


export class IncreaseFightersCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseFighters();
  }

  undo(){
    this._production_sheet.decreaseFighters();
  }

  toString() {
    return "Fighters increased.";
  }

  toDict() {
    return {
        name: "IncreaseFightersCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseFightersCommand(production_sheet);
  }
}


export class IncreasePointDefenseCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increasePointDefense();
  }

  undo(){
    this._production_sheet.decreasePointDefense();
  }

  toString() {
    return "Point Defense increased.";
  }

  toDict() {
    return {
        name: "IncreasePointDefenseCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreasePointDefenseCommand(production_sheet);
  }
}


export class IncreaseCloakingCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseCloaking();
  }

  undo(){
    this._production_sheet.decreaseCloaking();
  }

  toString() {
    return "Cloaking increased.";
  }

  toDict() {
    return {
        name: "IncreaseCloakingCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseCloakingCommand(production_sheet);
  }
}


export class IncreaseScannersCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseScanners();
  }

  undo(){
    this._production_sheet.decreaseScanners();
  }

  toString() {
    return "Scanners increased.";
  }

  toDict() {
    return {
        name: "IncreaseScannersCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseScannersCommand(production_sheet);
  }
}


export class IncreaseMinesCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseMines();
  }

  undo(){
    this._production_sheet.decreaseMines();
  }

  toString() {
    return "Mines increased.";
  }

  toDict() {
    return {
        name: "IncreaseMinesCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseMinesCommand(production_sheet);
  }
}


export class IncreaseMineSweeperCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.increaseMineSweeper();
  }

  undo(){
    this._production_sheet.decreaseMineSweeper();
  }

  toString() {
    return "Mine Sweeper increased.";
  }

  toDict() {
    return {
        name: "IncreaseMineSweeperCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new IncreaseMineSweeperCommand(production_sheet);
  }
}



export class PurchaseShipCommand {

  constructor(production_sheet, ship) {
    this._production_sheet = production_sheet;
    this._ship = ship;
  }

  do() {
    this._production_sheet.purchaseShip(this._ship);
  }

  undo() {
    this._production_sheet.sellShip(this._ship);
  }

  toString() {
    return this._ship.name + " purchased.";
  }

  toDict() {
    return {
        name: "PurchaseShipCommand",
        ship_type: this._ship.type
    };
  }

  static fromDict(production_sheet, dict) {
      var ships = {
        'Scout': Scout,
        'ShipYard': ShipYard,
        'ColonyShip': ColonyShip,
        'Miner': Miner,
        'Decoy': Decoy,
        'Destroyer': Destroyer,
        'Cruiser': Cruiser,
        'BattleCruiser': BattleCruiser,
        'BattleShip': BattleShip,
        'Dreadnaught': Dreadnaught,
        'Base': Base,
        'Mine': Mine,
        'MineSweeperShip': MineSweeperShip,
        'MSPipeline': MSPipeline,
        'Raider': Raider,
        'Carrier': Carrier,
        'FighterOne': FighterOne,
        'FighterTwo': FighterTwo,
        'FighterThree': FighterThree,
      }

    return new PurchaseShipCommand(production_sheet, ships[dict.ship_type]);
  }
}


export class LoseShipCommand {

  constructor(production_sheet, ship) {
    this._production_sheet = production_sheet;
    this._ship = ship;
  }

  do() {
    this._production_sheet.loseShip(this._ship);
  }

  undo(){
    this._production_sheet.findShip(this._ship);
  }

  toString() {
    return this._ship.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseShipCommand",
        ship_type: this._ship.type
    };
  }

  static fromDict(production_sheet, dict) {
      var ships = {
        'Scout': Scout,
        'ShipYard': ShipYard,
        'ColonyShip': ColonyShip,
        'Miner': Miner,
        'Decoy': Decoy,
        'Destroyer': Destroyer,
        'Cruiser': Cruiser,
        'BattleCruiser': BattleCruiser,
        'BattleShip': BattleShip,
        'Dreadnaught': Dreadnaught,
        'Base': Base,
        'Mine': Mine,
        'MineSweeperShip': MineSweeperShip,
        'MSPipeline': MSPipeline,
        'Raider': Raider,
        'Carrier': Carrier,
        'FighterOne': FighterOne,
        'FighterTwo': FighterTwo,
        'FighterThree': FighterThree,
      }

    return new LoseShipCommand(production_sheet, ships[dict.ship_type]);
  }
}



export class CommandFactory {

  create(production_sheet, name, dict) {
    var commands = {
      'AddColonyPointsCommand': AddColonyPointsCommand,
      'AddMineralPointsCommand': AddMineralPointsCommand,
      'SubtractBidPointsCommand': SubtractBidPointsCommand,
      'SubtractMaintenancePointsCommand': SubtractMaintenancePointsCommand,
      'EndTurnCommand': EndTurnCommand,
      'IncreaseShipSizeCommand': IncreaseShipSizeCommand,
      'IncreaseAttackCommand': IncreaseAttackCommand,
      'IncreaseDefenseCommand': IncreaseDefenseCommand,
      'IncreaseTacticsCommand': IncreaseTacticsCommand,
      'IncreaseMoveCommand': IncreaseMoveCommand,
      'IncreaseShipYardsCommand': IncreaseShipYardsCommand,
      'IncreaseTerraformingCommand': IncreaseTerraformingCommand,
      'IncreaseExplorationCommand': IncreaseExplorationCommand,
      'IncreaseSpaceWreckShipSizeCommand': IncreaseSpaceWreckShipSizeCommand,
      'IncreaseSpaceWreckAttackCommand': IncreaseSpaceWreckAttackCommand,
      'IncreaseSpaceWreckDefenseCommand': IncreaseSpaceWreckDefenseCommand,
      'IncreaseSpaceWreckTacticsCommand': IncreaseSpaceWreckTacticsCommand,
      'IncreaseSpaceWreckMoveCommand': IncreaseSpaceWreckMoveCommand,
      'IncreaseSpaceWreckShipYardsCommand': IncreaseSpaceWreckShipYardsCommand,
      'IncreaseSpaceWreckTerraformingCommand': IncreaseSpaceWreckTerraformingCommand,
      'IncreaseSpaceWreckExplorationCommand': IncreaseSpaceWreckExplorationCommand,
      'PurchaseShipCommand': PurchaseShipCommand,
      'LoseShipCommand': LoseShipCommand,
      'IncreaseFightersCommand': IncreaseFightersCommand,
      'IncreasePointDefenseCommand': IncreasePointDefenseCommand,
      'IncreaseCloakingCommand': IncreaseCloakingCommand,
      'IncreaseScannersCommand': IncreaseScannersCommand,
      'IncreaseMinesCommand': IncreaseMinesCommand,
      'IncreaseMineSweeperCommand': IncreaseMineSweeperCommand,
    }

    return commands[name].fromDict(production_sheet, dict);

  }
}
