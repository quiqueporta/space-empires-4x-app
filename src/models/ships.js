export class Ship {
  constructor(ship_data) {
    if (ship_data === undefined) {
      return;
    }
    this.type = ship_data['type']
    this.name = ship_data['name']
    this.cost = ship_data['cp']
    this.hullSize = ship_data['hull']
    this.shipSize = ship_data['size']
    this._maintenance = true;
    this._upgrade = false;
    this._maxCount = 50
    this.currentCount = 0;

    if ('maintenance' in ship_data) {
      this._maintenance = ship_data['maintenance'];
    }
    if ("upgrade" in ship_data) {
      this._upgrade = ship_data['upgrade'];
    }
    this._prereq = { 'Ship Size': this.shipSize };
    
    if ('prereq' in ship_data) {
      for (var prereq of ship_data['prereq']) {
        this._prereq[prereq['name']] = prereq['level'];
      }
    }
  }

  shortName() {
    if (this.type === this.name) {
      return '';
    } 
    
    return this.type;
  }

  increaseCount() {
    if (this.currentCount >= this._maxCount) {
      return;
    }

    this.currentCount += 1;
  }

  decreaseCount() {
    if (this.currentCount <= 0) {
      return;
    }

    this.currentCount -= 1;
  }

  canPurchase(constructionPoints) {
    if (this.currentCount >= this._maxCount) {
      return false;
    }

    return (this.cost <= constructionPoints);
  }

  upgradable() {
    return this._upgrade;
  }

  totalMaintenance() {
    if (this._maintenance === false) {
      return 0;
    }
    
    return this.currentCount * this.hullSize;
  }

  requirementsMet(techs) {
    for (var tech of techs) {
      if (tech.title in this._prereq && this._prereq[tech.title] > tech.currentLevel) {
        return false;
      }
    }
    return true;
  }
}