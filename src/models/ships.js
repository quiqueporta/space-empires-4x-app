export class Ship {
  constructor(ship_data, tech_data) {
    if (ship_data === undefined) {
      return;
    }
    this.type = ship_data['type']
    this.name = ship_data['name']
    this.cost = ship_data['cp']
    this.hullSize = ship_data['hull']
    this.shipSize = ship_data['size']
    this._maintenance = ('maintenance' in ship_data) ? ship_data['maintenance'] : true;
    this._upgrade = ('upgradable' in ship_data) ? ship_data['upgradable'] : false;
    this._autoUpgrade = ('autoupgrade' in ship_data) ? ship_data['autoupgrade'] : false;
    this._maxCount = 50
    this.currentCount = ('start' in ship_data) ? ship_data['start'] : 0;
    this.groups = {};
    
    if (ship_data['groups'] !== false) {
      var group_techs = {};
      if ('techs' in ship_data) {
        for (var tech of ship_data['techs']) {
          for (var techObj of tech_data) {
            if (techObj.title === tech['tech']) {
              group_techs[tech['tech']] = {
                'title': tech['tech'],
                'level': techObj.minLevel,
                'limit': ('limit' in tech) ? tech['limit'] : true
              }
            }
          }
        }
      }

      for (var group of ship_data['groups']) {
        var group_data = {
          'label': group,
          'count': this.currentCount
        };
        this.groups[group] = new ShipGroup(group_data, group_techs);
      }
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

  canUpgrade(constructionPoints) {
    return this._upgrade && this.currentCount > 0 && constructionPoints > this.hullSize
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

export class ShipGroup {
  constructor (group_data, group_techs) {
    if (group_data  === undefined) {
      return;
    }
    
    this.label = group_data['label'];
    this.count = ('count' in group_data) ? group_data['count'] : 1;
    this.techLevels = Object.assign({}, group_techs);
  }
}