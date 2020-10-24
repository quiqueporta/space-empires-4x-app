export class TechnologyProgression {

  constructor(tech_data) {
    this._minLevel = tech_data['start'];
    this._maxLevel = tech_data['start'] + tech_data['cost'].length;
    this._costs = {};
    for (i = 0; i < tech_data['cost'].length; i++) {
      this._costs[i + 1 + this._minLevel] = tech_data['cost'][i]
    }
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
    return this._cost[this.currentLevel];
  }

  costNextLevel() {
    return this._cost[this.currentLevel + 1];
  }

}


// export class ShipSize extends TechnologyProgression {

//   constructor() {
//     super(1, 6);
//   }


//   cost() {
//     return {
//       2: 10,
//       3: 15,
//       4: 20,
//       5: 20,
//       6: 20
//       };
//   }

//   getName() {
//     return "ShipSize";
//   }

// }


// export class Attack extends TechnologyProgression {

//   constructor() {
//     super(0, 3);
//   }

//   cost() {
//     return {
//       1: 20,
//       2: 30,
//       3: 25
//       };
//   }

//   getName() {
//     return "Attack";
//   }

// }


// export class Defense extends TechnologyProgression {

//   constructor() {
//     super(0, 3);
//   }

//   cost() {
//     return {
//       1: 20,
//       2: 30,
//       3: 25
//       };
//   }

//   getName() {
//     return "Defense";
//   }

// }


// export class Tactics extends TechnologyProgression {

//   constructor() {
//     super(0, 3);
//   }

//   cost() {
//     return {
//       1: 15,
//       2: 15,
//       3: 15
//       };
//   }

//   getName() {
//     return "Tactics";
//   }

// }


// export class Move extends TechnologyProgression {

//   constructor() {
//     super(1, 7);
//   }

//   cost() {
//     return {
//       2: 20,
//       3: 25,
//       4: 25,
//       5: 25,
//       6: 20,
//       7: 20
//       };
//   }

//   getName() {
//     return "Move";
//   }

// }


// export class ShipYards extends TechnologyProgression {

//   constructor() {
//     super(1, 3);
//   }

//   cost() {
//     return {
//       2: 20,
//       3: 25
//       };
//   }

//   getName() {
//     return "ShipYards";
//   }

// }


// export class Terraforming extends TechnologyProgression {

//   constructor() {
//     super(0, 1);
//   }

//   cost() {
//     return {
//       1: 20
//       };
//   }

//   getName() {
//     return "Terraforming";
//   }

// }


// export class Exploration extends TechnologyProgression {

//   constructor() {
//     super(0, 1);
//   }

//   cost() {
//     return {
//       1: 15
//       };
//   }

//   getName() {
//     return "Exploration";
//   }

// }


// export class Fighters extends TechnologyProgression {

//   constructor() {
//     super(0, 3);
//   }

//   cost() {
//     return {
//       1: 25,
//       2: 25,
//       3: 25
//       };
//   }

//   getName() {
//     return "Fighters";
//   }

// }


// export class PointDefense extends TechnologyProgression {

//   constructor() {
//     super(0, 3);
//   }

//   cost() {
//     return {
//       1: 20,
//       2: 20,
//       3: 20
//       };
//   }

//   getName() {
//     return "PointDefense";
//   }

// }


// export class Cloaking extends TechnologyProgression {

//   constructor() {
//     super(0, 2);
//   }

//   cost() {
//     return {
//       1: 30,
//       2: 30
//       };
//   }

//   getName() {
//     return "Cloaking";
//   }

// }


// export class Scanners extends TechnologyProgression {

//   constructor() {
//     super(0, 2);
//   }

//   cost() {
//     return {
//       1: 20,
//       2: 20
//       };
//   }

//   getName() {
//     return "Scanners";
//   }

// }


// export class Mines extends TechnologyProgression {

//   constructor() {
//     super(0, 1);
//   }

//   cost() {
//     return {
//       1: 30
//       };
//   }

//   getName() {
//     return "Mines";
//   }

// }


// export class MineSweeper extends TechnologyProgression {

//   constructor() {
//     super(0, 2);
//   }

//   cost() {
//     return {
//       1: 10,
//       2: 15
//       };
//   }

//   getName() {
//     return "MineSweeper";
//   }

// }

