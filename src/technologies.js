class TechnologyProgression {

  constructor(minLevel, maxLevel) {
    this._minLevel = minLevel;
    this._maxLevel = maxLevel;
    this.currentLevel = minLevel;
  }

  increaseLevel() {
    if (this.currentLevel >= this._maxLevel) {
      return;
    }

    this.currentLevel += 1;
  }

  decreaseLevel() {
    if (this.currentLevel <= this._minLevel) {
      return;
    }

    this.currentLevel -= 1;
  }

  canIncrease(constructionPoints) {
    if (this.onMaxLevel()) {
      return false;
    }

    return (this.costNextLevel() <= constructionPoints);
  }

  onMaxLevel() {
    return (this.currentLevel >= this._maxLevel);
  }

  costCurrentLevel() {
    return this.cost()[this.currentLevel];
  }

  costNextLevel() {
    return this.cost()[this.currentLevel + 1];
  }

}


export class ShipSize extends TechnologyProgression {

  constructor() {
    super(1, 6);
  }


  cost() {
    return {
      2: 10,
      3: 15,
      4: 20,
      5: 25,
      6: 30
      };
  }

  getName() {
    return "ShipSize";
  }

}


export class Attack extends TechnologyProgression {

  constructor() {
    super(0, 3);
  }

  cost() {
    return {
      1: 20,
      2: 30,
      3: 40
      };
  }

  getName() {
    return "Attack";
  }

}


export class Defense extends TechnologyProgression {

  constructor() {
    super(0, 3);
  }

  cost() {
    return {
      1: 20,
      2: 30,
      3: 40
      };
  }

  getName() {
    return "Defense";
  }

}


export class Tactics extends TechnologyProgression {

  constructor() {
    super(0, 3);
  }

  cost() {
    return {
      1: 15,
      2: 20,
      3: 30
      };
  }

  getName() {
    return "Tactics";
  }

}


export class Move extends TechnologyProgression {

  constructor() {
    super(1, 6);
  }

  cost() {
    return {
      2: 20,
      3: 30,
      4: 40,
      5: 40,
      6: 40
      };
  }

  getName() {
    return "Move";
  }

}


export class ShipYards extends TechnologyProgression {

  constructor() {
    super(1, 3);
  }

  cost() {
    return {
      2: 20,
      3: 30
      };
  }

  getName() {
    return "ShipYards";
  }

}


export class Terraforming extends TechnologyProgression {

  constructor() {
    super(0, 1);
  }

  cost() {
    return {
      1: 25
      };
  }

  getName() {
    return "Terraforming";
  }

}


export class Exploration extends TechnologyProgression {

  constructor() {
    super(0, 1);
  }

  cost() {
    return {
      1: 15
      };
  }

  getName() {
    return "Exploration";
  }

}
