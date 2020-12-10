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
    this.autoUpgrade = ('autoupgrade' in ship_data) ? ship_data['autoupgrade'] : false;
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
        this.addGroup(ship_data['start'], tech_data);
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

  mergableGroups(fromGroup) {
    return this.groups().filter(otherGroup => fromGroup.canMergeInto(otherGroup));
  }

  hasAvailableGroup() {
    return this.groups().length < _.keys(this._groups).length
  }

  addGroup(count, tech_data) {
    if (!count) { count = 1 }

    for (var [g, group] of Object.entries(this._groups)) {
      if (group.count === 0) {
        this.setGroupData(group, count, tech_data);
        return g;
      }
    }
  }

  setGroupData(group, count, tech_data) {
    group.count = count;
    if (tech_data) { group.upgrade(tech_data, this.hullSize); }
  }

  increaseCount(groupLabel, tech_data) {
    if (!this.grouped()) {
      if (this.currentCount < this._maxCount) {
        this.currentCount += 1;
      }
      return groupLabel;
    }

    if (groupLabel) {
      if (this._groups[groupLabel].count < 6) {
        this._groups[groupLabel].count += 1;
      }
      return groupLabel;
    }

    return this.addGroup(1, tech_data);
  }

  decreaseCount(groupLabel) {
    if (!this.grouped()) {
      if (this.currentCount > 0) {
        this.currentCount -= 1;
      }
      return;
    }

    if (this._groups[groupLabel].count > 0) {
      this._groups[groupLabel].count -= 1;
    }
  }

  canPurchase(constructionPoints, groupLabel) {
    if (this.cost > constructionPoints) {
      return false;
    }

    if (!this.grouped()) {
      return this.currentCount < this._maxCount;
    }

    // purchasing a ship for an existing group 
    if (groupLabel) {
      return this._groups[groupLabel].count < 6;
    }

    // purchasing the first ship for a new group only allowed if there's an available group
    return this.hasAvailableGroup()
  }

  canLose(groupLabel) {
    if (!this.grouped()) {
      return this.currentCount > 0;
    }

    // purchasing a ship for an existing group 
    return this._groups[groupLabel].count > 0;
  }

  upgradable(tech_data, groupLabel) {
    if (this.grouped() && groupLabel) {
      return this._upgrade && this._groups[groupLabel].canUpgrade(tech_data, this.hullSize);
    }

    return this._upgrade;
  }

  canUpgrade(constructionPoints, tech_data, groupLabel) {
    return this.upgradable(tech_data, groupLabel) && constructionPoints >= this.upgradeCost(groupLabel);
  }

  upgradeCost(groupLabel) {
    if (groupLabel) {
      return this.hullSize * this._groups[groupLabel].count;
    }

    return this.hullSize;
  }

  upgradeAll(tech_data) {
    for (var [_, group] of Object.entries(this._groups)) {
      this.upgrade(tech_data, group.label);
    }
  }

  upgrade(tech_data, groupLabel) {
    this._groups[groupLabel].upgrade(tech_data, this.hullSize);
    return this.currentTechs(groupLabel);
  }

  downgrade(oldTechs, groupLabel) {
    this._groups[groupLabel].techLevels = _.cloneDeep(oldTechs);
  }

  splitGroup(groupLabel, count, newGroupLabel=null) {
    var newGroup;
    if (newGroupLabel) {
      newGroup = newGroupLabel;
      this.setGroupData(this._groups[newGroup], count);
    } else {
      newGroup = this.addGroup(count);
    }
    this._groups[groupLabel].count -= count;
    this._groups[newGroup].techLevels = _.cloneDeep(this._groups[groupLabel].techLevels);

    return newGroup;
  }

  mergeGroups(fromGroup, toGroup) {
    var numMerged = this._groups[fromGroup].count
    this._groups[toGroup].count += numMerged;
    this._groups[fromGroup].count = 0;

    return numMerged;
  }

  totalMaintenance() {
    if (this._maintenance === false) {
      return 0;
    }

    var total = 0;
    if (this.grouped()) {
      for (var group of this.groups()) {
        total += group.count;
      }
    } else {
      total = this.currentCount;
    }
    
    return total * this.hullSize;
  }

  requirementsMet(techs) {
    for (var tech of techs) {
      if (tech.title in this._prereq && this._prereq[tech.title] > tech.currentLevel) {
        return false;
      }
    }
    return true;
  }

  currentTechs(groupLabel) {
    return _.cloneDeep(this._groups[groupLabel].techLevels);
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
    this.techLevels = _.cloneDeep(group_techs);
  }

  canUpgrade(tech_data, hullSize) {
    for (var techObj of tech_data) {
      if (techObj.title in this.techLevels) {
        var thisTech = this.techLevels[techObj.title];
        var max = (techObj.hullLimit && thisTech['limit']) ? hullSize : 99;
        if (thisTech['level'] < Math.min(max, techObj.currentLevel)) {
          return true;
        }
      }
    }

    // If it gets here, all techs are at max
    return false;
  }

  canMergeInto(otherGroup) {
    if (this.label === otherGroup.label) {
      return false;
    }

    if (otherGroup.count === 0 || this.count + otherGroup.count > 6) {
      return false;
    }

    if (!_.isEqual(_.keys(this.techLevels).sort(), _.keys(otherGroup.techLevels).sort())) {
      return false;
    }

    for (var tech of _.keys(this.techLevels)) {
      if (!_.isEqual(this.techLevels[tech], otherGroup.techLevels[tech])) {
        return false;
      }
    }

    return true;
  }

  upgrade(tech_data, hullSize) {
    for (var techObj of tech_data) {
      if (techObj.title in this.techLevels) {
        var thisTech = this.techLevels[techObj.title];
        var max = (techObj.hullLimit && thisTech['limit']) ? hullSize : 99;
        thisTech['level'] = Math.min(max, techObj.currentLevel);
      }
    }
  }

  techString() {
    if (!this.techLevels) { return '' }
    return _.map(this.techLevels, tech => tech.title.split(' ').map(i => i[0]).join('') + ':' + tech.level).join(' | ');
  }
}