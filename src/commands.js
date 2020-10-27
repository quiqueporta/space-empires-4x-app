// TODO: IMPORT SHIPS

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

  static fromDict(production_sheet, _data, dict) {
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

  static fromDict(production_sheet, _data, dict) {
    return new AddMineralPointsCommand(production_sheet, dict.points);
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

  static fromDict(production_sheet, _data, dict) {
    return new SubtractMaintenancePointsCommand(production_sheet, dict.points);
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

  static fromDict(production_sheet, _data, dict) {
    return new SubtractBidPointsCommand(production_sheet, dict.points);
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

  static fromDict(production_sheet, _data, dict) {
    return new EndTurnCommand(production_sheet, dict.turn);
  }
}

// TODO: ShipWreck commands: ShipSize, Attack, Defense, Tactics, Move, SY, Terraforming, Exploration

export class IncreaseTechCommand {
  constructor(production_sheet, tech, wreck) {
    this._production_sheet = production_sheet;
    this._tech = tech;
    this._wreck = wreck;
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
    return this._tech.title + ' increased.';
  }

  toDict() {
    return {
      name: 'IncreaseTechCommand',
      tech: this._tech.title,
      wreck: this._wreck
    }
  };

  static fromDict(production_sheet, data, dict) {
    for (var i = 0; i < data.techs.length; i++) {
      if (dict.tech == data.techs[i].title) {
        return new IncreaseTechCommand(production_sheet, data.techs[i], dict.wreck)
      }
    }
    return;
  }
}


export class CommandFactory {
  create(production_sheet, data, name, dict) {
    var commands = {
      'AddColonyPointsCommand': AddColonyPointsCommand,
      'AddMineralPointsCommand': AddMineralPointsCommand,
      'SubtratBidPointsCommand': SubtractBidPointsCommand,
      'SubtractMaintenancePointsCommand': SubtractMaintenancePointsCommand,
      'EndTurnCommand': EndTurnCommand,
      'IncreaseTechCommand': IncreaseTechCommand
    };

    return commands[name].fromDict(production_sheet, data, dict);
  }
}