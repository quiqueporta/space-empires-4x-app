import { Scout, ShipYard, Miner, ColonyShip, Decoy, Destroyer, Cruiser, BattleCruiser,
         BattleShip, Dreadnaught, Base } from './ships';


export class AddColonyPointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.increaseContructionPoints(this._points);
  }

  undo(){
    this._production_sheet.decreaseContructionPoints(this._points);
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
    this._production_sheet.increaseContructionPoints(this._points);
  }

  undo(){
    this._production_sheet.decreaseContructionPoints(this._points);
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


export class SubstractBidPointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.decreaseContructionPoints(this._points);
  }

  undo(){
    this._production_sheet.increaseContructionPoints(this._points);
  }

  toString() {
    return "Substracted " + this._points + " Bid Points.";
  }

  toDict() {
    return {
        name: "SubstractBidPointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new SubstractBidPointsCommand(production_sheet, dict.points);
  }

}


export class SubstractMaintenancePointsCommand {
  constructor(production_sheet, points) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
  }

  do() {
    this._production_sheet.decreaseContructionPoints(this._points);
  }

  undo(){
    this._production_sheet.increaseContructionPoints(this._points);
  }

  toString() {
    return "Substracted " + this._points + " Maintenance Points.";
  }

  toDict() {
    return {
        name: "SubstractMaintenancePointsCommand",
        points: this._points
    };
  }

  static fromDict(production_sheet, dict) {
    return new SubstractMaintenancePointsCommand(production_sheet, dict.points);
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
      }

    return new LoseShipCommand(production_sheet, ships[dict.ship_type]);
  }
}



export class CommandFactory {

  create(production_sheet, name, dict) {
    var commands = {
      'AddColonyPointsCommand': AddColonyPointsCommand,
      'AddMineralPointsCommand': AddMineralPointsCommand,
      'SubstractBidPointsCommand': SubstractBidPointsCommand,
      'SubstractMaintenancePointsCommand': SubstractMaintenancePointsCommand,
      'EndTurnCommand': EndTurnCommand,
      'IncreaseShipSizeCommand': IncreaseShipSizeCommand,
      'IncreaseAttackCommand': IncreaseAttackCommand,
      'IncreaseDefenseCommand': IncreaseDefenseCommand,
      'IncreaseTacticsCommand': IncreaseTacticsCommand,
      'IncreaseMoveCommand': IncreaseMoveCommand,
      'IncreaseShipYardsCommand': IncreaseShipYardsCommand,
      'IncreaseTerraformingCommand': IncreaseTerraformingCommand,
      'IncreaseExplorationCommand': IncreaseExplorationCommand,
      'PurchaseShipCommand': PurchaseShipCommand,
      'LoseShipCommand': LoseShipCommand,
    }

    return commands[name].fromDict(production_sheet, dict);

  }
}
