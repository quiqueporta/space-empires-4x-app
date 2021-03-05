export class TechnologyProgression {

  constructor(tech_data, tech_sheet_info) {
    if (tech_data === undefined) {
      return;
    }
    this.title = tech_data['name'];
    // this.short = ('shortname' in tech_data) ? tech_data['shortname'] : tech_data['name'];
    this.short = _.get(tech_data, 'shortname', tech_data['name']);
    this.advanced = tech_data['advanced'];
    this.wreck = tech_data['spacewreck'];
    // this.hullLimit = ('hull_limit' in tech_data ? tech_data['hull_limit'] : false);
    this.hullLimit = _.get(tech_data, 'hull_limit', false);
    this.minLevel = tech_data['start'];
    // this.maxLevel = tech_data['start'] + tech_data['cost'].length;
    this.maxLevel = _.get(tech_sheet_info, 'max', tech_data['start'] + tech_data['cost'].length);
    this.costs = {};
    for (var i = 0; i < tech_data['cost'].length; i++) {
      if ((i + 1 + this.minLevel) > this.maxLevel) {
        break;
      }
      this.costs[i + 1 + this.minLevel] = tech_data['cost'][i]
    }
    this.currentLevel = this.minLevel;
  }

  cleanTitle() {
    return this.title.split(" ").join('');
  }

  increaseLevel() {
    if (this.currentLevel >= this.maxLevel) {
      return;
    }

    this.currentLevel += 1;
  }

  decreaseLevel() {
    if (this.currentLevel <= this.minLevel) {
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
    return (this.currentLevel >= this.maxLevel);
  }

  costCurrentLevel() {
    return this.costs[this.currentLevel];
  }

  costNextLevel() {
    return this.costs[this.currentLevel + 1];
  }
}