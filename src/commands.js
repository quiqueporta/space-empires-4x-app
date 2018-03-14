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


export class LoseColonyShipCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseColonyShip();
  }

  undo(){
    this._production_sheet.findColonyShip();
  }

  toString() {
    return ColonyShip.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseColonyShipCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseColonyShipCommand(production_sheet);
  }
}


export class LoseScoutCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseScout();
  }

  undo(){
    this._production_sheet.findScout();
  }

  toString() {
    return Scout.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseScoutCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseScoutCommand(production_sheet);
  }
}


export class LoseMinerCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseMiner();
  }

  undo(){
    this._production_sheet.findMiner();
  }

  toString() {
    return Miner.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseMinerCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseMinerCommand(production_sheet);
  }
}


export class LoseDecoyCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseDecoy();
  }

  undo(){
    this._production_sheet.findDecoy();
  }

  toString() {
    return Decoy.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseDecoyCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseDecoyCommand(production_sheet);
  }
}


export class LoseShipYardCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseShipYard();
  }

  undo(){
    this._production_sheet.findShipYard();
  }

  toString() {
    return ShipYard.name + " Yard lost.";
  }

  toDict() {
    return {
        name: "LoseShipYardCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseShipYardCommand(production_sheet);
  }
}


export class LoseDestroyerCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseDestroyer();
  }

  undo(){
    this._production_sheet.findDestroyer();
  }

  toString() {
    return Destroyer.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseDestroyerCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseDestroyerCommand(production_sheet);
  }
}


export class LoseBaseCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseBase();
  }

  undo(){
    this._production_sheet.findBase();
  }

  toString() {
    return Base.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseBaseCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseBaseCommand(production_sheet);
  }
}


export class LoseCruiserCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseCruiser();
  }

  undo(){
    this._production_sheet.findCruiser();
  }

  toString() {
    return Cruiser.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseCruiserCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseCruiserCommand(production_sheet);
  }
}


export class LoseBattleCruiserCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseBattleCruiser();
  }

  undo(){
    this._production_sheet.findBattleCruiser();
  }

  toString() {
    return BattleCruiser.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseBattleCruiserCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseBattleCruiserCommand(production_sheet);
  }
}


export class LoseBattleShipCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseBattleShip();
  }

  undo(){
    this._production_sheet.findBattleShip();
  }

  toString() {
    return BattleShip.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseBattleShipCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseBattleShipCommand(production_sheet);
  }
}


export class LoseDreadnaughtCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.loseDreadnaught();
  }

  undo(){
    this._production_sheet.findDreadnaught();
  }

  toString() {
    return Dreadnaught.name + " lost.";
  }

  toDict() {
    return {
        name: "LoseDreadnaughtCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new LoseDreadnaughtCommand(production_sheet);
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
      'LoseColonyShipCommand': LoseColonyShipCommand,
      'LoseScoutCommand': LoseScoutCommand,
      'LoseMinerCommand': LoseMinerCommand,
      'LoseDecoyCommand': LoseDecoyCommand,
      'LoseShipYardCommand': LoseShipYardCommand,
      'LoseDestroyerCommand': LoseDestroyerCommand,
      'LoseBaseCommand': LoseBaseCommand,
      'LoseCruiserCommand': LoseCruiserCommand,
      'LoseBattleCruiserCommand': LoseBattleCruiserCommand,
      'LoseBattleShipCommand': LoseBattleShipCommand,
      'LoseDreadnaughtCommand': LoseDreadnaughtCommand,
      'PurchaseShipCommand': PurchaseShipCommand,
    }

    return commands[name].fromDict(production_sheet, dict);

  }
}
