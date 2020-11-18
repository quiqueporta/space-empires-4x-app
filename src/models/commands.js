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
  constructor(production_sheet, turn, currentCP, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._turn = turn;
    this._currentCP = currentCP;
    this._key = key;
  }

  do() {
    this._production_sheet.increaseTurn();
  }

  undo() {
    this._production_sheet.decreaseTurn();
  }

  toString() {
    return "End turn " + this._turn + " with " + this._currentCP + " CPs.";
  }

  toDict() {
    return {
        name: "EndTurnCommand",
        turn: this._turn,
        currentCP: this._currentCP,
        key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, _data, dict) {
    return new EndTurnCommand(production_sheet, dict.turn, dict.currentCP, dict.key);
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
    this._production_sheet.autoUpgradeShips();
  }

  undo () {
    this._tech.decreaseLevel();
    if (!this._wreck) {
      this._production_sheet.increaseConstructionPoints(this._tech.costNextLevel());
    }
    this._production_sheet.autoUpgradeShips();
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
  constructor(production_sheet, ship, group, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._group = group;
    this._key = key;
  }

  do() {
    this._group = this._production_sheet.purchaseShip(this._ship, this._group);
  }

  undo() {
    this._production_sheet.sellShip(this._ship, this._group);
  }

  toString() {
    var groupStr = "";
    if (this._group) {
      groupStr = ' and added to ' + this._group;
    }
    return this._ship.name + " purchased" + groupStr + ".";
  }

  toDict() {
    return {
      name: "PurchaseShipCommand",
      ship_type: this._ship.type,
      ship_group: this._group,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        return new PurchaseShipCommand(production_sheet, ship, dict.ship_group, dict.key)
      }
    }
    return;
  }
}

export class LoseShipCommand {
  constructor(production_sheet, ship, group, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._group = group;
    this._key = key;
  }

  do() {
    this._production_sheet.loseShip(this._ship, this._group);
  }

  undo() {
    this._production_sheet.regainShip(this._ship, this._group);
  }

  toString() {
    var groupStr = "";
    if (this._group) {
      groupStr = ' from ' + this._group;
    }
    return this._ship.name + ' lost' + groupStr + '.';
  }

  toDict() {
    return {
      name: 'LoseShipCommand',
      ship_type: this._ship.type,
      ship_group: this._group,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        return new LoseShipCommand(production_sheet, ship, dict.group, dict.key)
      }
    }
    return;
  }
}

export class UpgradeShipCommand {
  constructor(production_sheet, ship, group, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._group = group;
    this._key = key;
  }

  do() {
    this._oldTechs = this._ship.currentTechs(this._group);
    this._newTechs = this._production_sheet.upgradeGroup(this._ship, this._group);
  }

  undo() {
    this._production_sheet.downgradeGroup(this._ship, this._group, this._oldTechs);
  }

  toString() {
    return this._ship.name + ' ' + this._group + ' upgraded.';
  }

  toDict() {
    return {
      name: 'UpgradeShipCommand',
      ship_type: this._ship.type,
      ship_group: this._group,
      oldTechs: this._oldTechs,
      newTechs: this._newTechs,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type == ship.type) {
        var cmd = new UpgradeShipCommand(production_sheet, ship, dict.ship_group, dict.key);
        cmd._oldTechs = dict.oldTechs;
        cmd._newTechs = dict.newTechs;
        return cmd;
      }
    }
    return;
  }
}

export class SplitGroupCommand {
  constructor(production_sheet, ship, group, count, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._group = group;
    this._count = count;
    this._key = key;
  }

  do() {
    this._newGroup = this._production_sheet.splitGroup(this._ship, this._group, this._count);
  }

  undo() {
    this._production_sheet.mergeGroups(this._ship, this._newGroup, this._group);
  }

  toString() {
    return this._count + ' ships in ' + this._ship.name + ' ' + this._group + ' split to ' + this._newGroup + '.';
  }

  toDict() {
    return {
      name: 'SplitGroupCommand',
      ship_type: this._ship.type,
      ship_group: this._group,
      ship_newGroup: this._newGroup,
      count: this._count,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type === ship.type) {
        var cmd = new SplitGroupCommand(production_sheet, ship, dict.ship_group, dict.count, dict.key);
        cmd._newGroup = dict.ship_newGroup;
        return cmd;
      }
    }
    return;
  }
}

export class MergeGroupsCommand {
  constructor(production_sheet, ship, groupFrom, groupTo, key=Date.now()) {
    this._production_sheet = production_sheet;
    this._ship = ship;
    this._groupFrom = groupFrom;
    this._groupTo = groupTo;
    this._key = key;
  }

  do() {
    this._count = this._production_sheet.mergeGroups(this._ship, this._groupFrom, this._groupTo);
  }

  undo() {
    this._production_sheet.splitGroup(this._ship, this._groupTo, this._count, this._groupFrom);
  }

  toString() {
    return this._count + ' ships in ' + this._ship.name + ' ' + this._groupFrom + ' merged into ' + this._groupTo + '.';
  }

  toDict() {
    return {
      name: 'MergeGroupsCommand',
      ship_type: this._ship.type,
      ship_groupFrom: this._groupFrom,
      ship_groupTo: this._groupTo,
      count: this._count,
      key: this._key
    };
  }

  key() {
    return this._key;
  }

  static fromDict(production_sheet, data, dict) {
    for (var ship of data.ships) {
      if (dict.ship_type === ship.type) {
        var cmd = new MergeGroupsCommand(production_sheet, ship, dict.ship_groupFrom, dict.ship_groupTo, dict.key);
        cmd._count = dict.count;
        return cmd;
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
      'SplitGroupCommand': SplitGroupCommand,
      'MergeGroupsCommand': MergeGroupsCommand
    };

    return commands[name].fromDict(production_sheet, data, dict);
  }
}
