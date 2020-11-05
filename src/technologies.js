export class TechnologyProgression {

  constructor(tech_data) {
    if (tech_data === undefined) {
      return;
    }
    this.title = tech_data['name'];
    this.advanced = tech_data['advanced'];
    this.wreck = tech_data['shipwreck'];
    this._minLevel = tech_data['start'];
    this._maxLevel = tech_data['start'] + tech_data['cost'].length;
    this.costs = {};
    for (var i = 0; i < tech_data['cost'].length; i++) {
      this.costs[i + 1 + this._minLevel] = tech_data['cost'][i]
    }
    this.currentLevel = this._minLevel;
  }

  cleanTitle() {
    return this.title.split(" ").join('');
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
    return this.costs[this.currentLevel];
  }

  costNextLevel() {
    return this.costs[this.currentLevel + 1];
  }
}