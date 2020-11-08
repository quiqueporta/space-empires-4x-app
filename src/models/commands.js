export class AddColonyPointsCommand {
  constructor(production_sheet, points, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
    this._key = key;
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
      points: this._points,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new AddColonyPointsCommand(production_sheet, dict.points, dict.key);
  }
}

export class AddMsPipelinePointsCommand {
  constructor(production_sheet, points, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
    this._key = key;
  }

  do() {
    this._production_sheet.increaseConstructionPoints(this._points);
  }

  undo(){
    this._production_sheet.decreaseConstructionPoints(this._points);
  }

  toString() {
    return "Added " + this._points + " MS Pipeline Points.";
  }

  toDict() {
    return {
      name: "AddMsPipelinePointsCommand",
      points: this._points,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new AddMsPipelinePointsCommand(production_sheet, dict.points);
  }
}

export class AddMineralPointsCommand {
  constructor(production_sheet, points, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
    this._key = key;
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
        points: this._points,
        key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new AddMineralPointsCommand(production_sheet, dict.points, dict.key);
  }
}

export class SubtractMaintenancePointsCommand {
  constructor(production_sheet, points, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
    this._key = key;
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
        points: this._points,
        key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new SubtractMaintenancePointsCommand(production_sheet, dict.points, dict.key);
  }
}

export class SubtractBidPointsCommand {
  constructor(production_sheet, points, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._points = parseInt(points);
    this._key = key;
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
        points: this._points,
        key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new SubtractBidPointsCommand(production_sheet, dict.points, dict.key);
  }
}

export class EndTurnCommand {
  constructor(production_sheet, turn, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._turn = turn;
    this._key = key;
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
        turn: this._turn,
        key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new EndTurnCommand(production_sheet, dict.turn, dict.key);
  }
}

export class IncreaseTechCommand {
  constructor(production_sheet, tech, level, wreck, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._tech = tech;
    this._level = level;
    this._wreck = wreck;
    this._key = key;
  }

  do () {
    this._tech.increaseLevel();
    if (!this._wreck) {
      this._production_sheet.decreaseConstructionPoints(this._tech.costCurrentLevel());
    }
  }

  undo () {
    this._tech.decreaseLevel();
    if (!this._wreck) {
      this._production_sheet.increaseConstructionPoints(this._tech.costNextLevel());
    }
  }

  toString () {
    var acquisition = this._wreck ? 'acquired from Space Wreck' : 'purchased';
    return this._tech.title + ' level ' + this._level + ' ' + acquisition + '.';
  }

  toDict() {
    return {
      name: 'IncreaseTechCommand',
      tech: this._tech.title,
      level: this._level,
      wreck: this._wreck,
      key: this._key
    }
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var tech of data.techs) {
      if (dict.tech == tech.title) {
        return new IncreaseTechCommand(production_sheet, tech, dict.level, dict.wreck, dict.key)
      }
    }
    return;
  }
}

export class PurchaseShipCommand {
  constructor(production_sheet, ship, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._key = key;
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
      ship_type: this._ship.type,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        return new PurchaseShipCommand(production_sheet, ship, dict.key)
      }
    }
    return;
  }
}

export class LoseShipCommand {
  constructor(production_sheet, ship, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._key = key;
  }

  do() {
    this._production_sheet.loseShip(this._ship);
  }

  undo() {
    this._production_sheet.regainShip(this._ship);
  }

  toString() {
    return this._ship.name + ' lost.';
  }

  toDict() {
    return {
      name: 'LoseShipCommand',
      ship_type: this._ship.type,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        return new LoseShipCommand(production_sheet, ship, dict.key)
      }
    }
    return;
  }
}

export class UpgradeShipCommand {
  constructor(production_sheet, ship, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._key = key;
  }

  do() {
    this._production_sheet.upgradeShip(this._ship);
  }

  undo() {
    this._production_sheet.downgradeShip(this._ship);
  }

  toString() {
    return this._ship.name + ' upgraded.';
  }

  toDict() {
    return {
      name: 'UpgradeShipCommand',
      ship_type: this._ship.type,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        return new UpgradeShipCommand(production_sheet, ship, dict.key)
      }
    }
    return;
  }
}


export class CommandFactory {
  create(production_sheet, data, name, dict) {
    var commands = {
      'AddColonyPointsCommand': AddColonyPointsCommand,
      'AddMsPipelinePointsCommand': AddMsPipelinePointsCommand,
      'AddMineralPointsCommand': AddMineralPointsCommand,
      'SubtractBidPointsCommand': SubtractBidPointsCommand,
      'SubtractMaintenancePointsCommand': SubtractMaintenancePointsCommand,
      'EndTurnCommand': EndTurnCommand,
      'PurchaseShipCommand': PurchaseShipCommand,
      'LoseShipCommand': LoseShipCommand,
      'IncreaseTechCommand': IncreaseTechCommand,
      'UpgradeShipCommand': UpgradeShipCommand,
    };

    return commands[name].fromDict(production_sheet, data, dict);
  }
}