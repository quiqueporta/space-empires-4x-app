var _ = require('lodash');

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
    this._groups = {};
    this._techs = ship_data['techs'];
    
    if (ship_data['groups'] !== false) {
      var groupTechs = {};
      if ('techs' in ship_data) {
        groupTechs = this._techInfo(tech_data);
      }

      for (var group of ship_data['groups']) {
        var groupData = {
          'label': group,
          'count': 0
        };
        this._groups[group] = new ShipGroup(groupData, groupTechs);
      }

      if ('start' in ship_data) {
        this.addGroup(ship_data['start']);
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

  grouped() {
    return !_.isEmpty(this._groups);
  }

  groups() {
    var activeGroups = [];
    for (var [g, group] of Object.entries(this._groups)) {
      if (group.count > 0) {
        activeGroups.push(group);
      }
    }

    return activeGroups;
  }

  addGroup(count, tech) {
    if (!count) { count = 1 }

    for (var [g, group] of Object.entries(this._groups)) {
      if (group.count === 0) {
        group.count = count;
        // add techs?
        return;
      }
    }
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

  _techInfo(tech_data) {
    var groupTechs = {};
    
    for (var tech of this._techs) {
      for (var techObj of tech_data) {
        if (techObj.title === tech['tech']) {
          groupTechs[tech['tech']] = {
            'title': tech['tech'],
            'level': techObj.minLevel,
            'limit': ('limit' in tech) ? tech['limit'] : true
          }
        }
      }
    }

    return groupTechs;
  }
}

export class ShipGroup {
  constructor (group_data, group_techs) {
    if (group_data  === undefined) {
      return;
    }
    
    this.label = group_data['label'];
    this.count = ('count' in group_data) ? group_data['count'] : 0;
    this.techLevels = Object.assign({}, group_techs);
  }

  techString() {
    if (!this.techLevels) { return '' }
    console.log(this.techLevels);
    return _.map(this.techLevels, tech => tech.title.split(' ').map(i => i[0]).join('') + ':' + tech.level).join(' | ');
  }
}