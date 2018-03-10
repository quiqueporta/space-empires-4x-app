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


export class PurchaseScoutCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseScout();
  }

  undo() {
    this._production_sheet.sellScout();
  }

  toString() {
    return "Scout purchased.";
  }

  toDict() {
    return {
        name: "PurchaseScoutCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseScoutCommand(production_sheet);
  }
}


export class PurchaseShipYardCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseShipYard();
  }

  undo() {
    this._production_sheet.sellShipYard();
  }

  toString() {
    return "ShipYard purchased.";
  }

  toDict() {
    return {
        name: "PurchaseShipYardCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseShipYardCommand(production_sheet);
  }
}


export class PurchaseColonyShipCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseColonyShip();
  }

  undo() {
    this._production_sheet.sellColonyShip();
  }

  toString() {
    return "ColonyShip purchased.";
  }

  toDict() {
    return {
        name: "PurchaseColonyShipCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseColonyShipCommand(production_sheet);
  }
}


export class PurchaseMinerCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseMiner();
  }

  undo() {
    this._production_sheet.sellMiner();
  }

  toString() {
    return "Miner purchased.";
  }

  toDict() {
    return {
        name: "PurchaseMinerCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseMinerCommand(production_sheet);
  }
}


export class PurchaseDecoyCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseDecoy();
  }

  undo() {
    this._production_sheet.sellDecoy();
  }

  toString() {
    return "Decoy purchased.";
  }

  toDict() {
    return {
        name: "PurchaseDecoyCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseDecoyCommand(production_sheet);
  }
}


export class PurchaseDestroyerCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseDestroyer();
  }

  undo() {
    this._production_sheet.sellDestroyer();
  }

  toString() {
    return "Destroyer purchased.";
  }

  toDict() {
    return {
        name: "PurchaseDestroyerCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseDestroyerCommand(production_sheet);
  }
}


export class PurchaseCruiserCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseCruiser();
  }

  undo() {
    this._production_sheet.sellCruiser();
  }

  toString() {
    return "Cruiser purchased.";
  }

  toDict() {
    return {
        name: "PurchaseCruiserCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseCruiserCommand(production_sheet);
  }
}


export class PurchaseBattleCruiserCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseBattleCruiser();
  }

  undo() {
    this._production_sheet.sellBattleCruiser();
  }

  toString() {
    return "BattleCruiser purchased.";
  }

  toDict() {
    return {
        name: "PurchaseBattleCruiserCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseBattleCruiserCommand(production_sheet);
  }
}


export class PurchaseBattleShipCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseBattleShip();
  }

  undo() {
    this._production_sheet.sellBattleShip();
  }

  toString() {
    return "BattleShip purchased.";
  }

  toDict() {
    return {
        name: "PurchaseBattleShipCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseBattleShipCommand(production_sheet);
  }
}

export class PurchaseDreadnaughtCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseDreadnaught();
  }

  undo() {
    this._production_sheet.sellDreadnaught();
  }

  toString() {
    return "Dreadnaught purchased.";
  }

  toDict() {
    return {
        name: "PurchaseDreadnaughtCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseDreadnaughtCommand(production_sheet);
  }
}

export class PurchaseBaseCommand {

  constructor(production_sheet) {
    this._production_sheet = production_sheet;
  }

  do() {
    this._production_sheet.purchaseBase();
  }

  undo() {
    this._production_sheet.sellBase();
  }

  toString() {
    return "Base purchased.";
  }

  toDict() {
    return {
        name: "PurchaseBaseCommand"
    };
  }

  static fromDict(production_sheet, dict) {
    return new PurchaseBaseCommand(production_sheet);
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
    return "ColonyShip lost.";
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
    return "Scout lost.";
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
    return "Miner lost.";
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
    return "Decoy lost.";
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
    return "Ship Yard lost.";
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
    return "Destroyer lost.";
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
    return "Base lost.";
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
    return "Cruiser lost.";
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
    return "BattleCruiser lost.";
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
    return "BattleShip lost.";
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
    return "Dreadnaught lost.";
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
      AddColonyPointsCommand: AddColonyPointsCommand,
      AddMineralPointsCommand: AddMineralPointsCommand,
      SubstractBidPointsCommand: SubstractBidPointsCommand,
      SubstractMaintenancePointsCommand: SubstractMaintenancePointsCommand,
      EndTurnCommand: EndTurnCommand,
      IncreaseShipSizeCommand: IncreaseShipSizeCommand,
      IncreaseAttackCommand: IncreaseAttackCommand,
      IncreaseDefenseCommand: IncreaseDefenseCommand,
      IncreaseTacticsCommand: IncreaseTacticsCommand,
      IncreaseMoveCommand: IncreaseMoveCommand,
      IncreaseShipYardsCommand: IncreaseShipYardsCommand,
      IncreaseTerraformingCommand: IncreaseTerraformingCommand,
      IncreaseExplorationCommand: IncreaseExplorationCommand,
      PurchaseScoutCommand: PurchaseScoutCommand,
      PurchaseShipYardCommand: PurchaseShipYardCommand,
      PurchaseColonyShipCommand: PurchaseColonyShipCommand,
      PurchaseMinerCommand: PurchaseMinerCommand,
      PurchaseDecoyCommand: PurchaseDecoyCommand,
      PurchaseDestroyerCommand: PurchaseDestroyerCommand,
      PurchaseCruiserCommand: PurchaseCruiserCommand,
      PurchaseBattleCruiserCommand: PurchaseBattleCruiserCommand,
      PurchaseBattleShipCommand: PurchaseBattleShipCommand,
      PurchaseDreadnaughtCommand: PurchaseDreadnaughtCommand,
      PurchaseBaseCommand: PurchaseBaseCommand,
      LoseColonyShipCommand: LoseColonyShipCommand,
      LoseScoutCommand: LoseScoutCommand,
      LoseMinerCommand: LoseMinerCommand,
      LoseDecoyCommand: LoseDecoyCommand,
      LoseShipYardCommand: LoseShipYardCommand,
      LoseDestroyerCommand: LoseDestroyerCommand,
      LoseBaseCommand: LoseBaseCommand,
      LoseCruiserCommand: LoseCruiserCommand,
      LoseBattleCruiserCommand: LoseBattleCruiserCommand,
      LoseBattleShipCommand: LoseBattleShipCommand,
      LoseDreadnaughtCommand: LoseDreadnaughtCommand,
    }

    return commands[name].fromDict(production_sheet, dict);

  }
}
