import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import toastr from 'toastr'

import { TechnologyProgression } from './technologies';
import { AddColonyPointsCommand, AddMineralPointsCommand, SubtractBidPointsCommand, SubtractMaintenancePointsCommand, EndTurnCommand } from './commands';

// TODO: import ships
// TODO: import commands

var STORAGE_KEY = 'space-empires-4x-v3'

var seen = [];

var replacer = function(key, value) {
  if (value != null && typeof value == "object") {
    if (seen.indexOf(value) >= 0) {
      return;
    }
    seen.push(value);
  }
  return value;
};

var spaceEmpiresStorage = {
  fetch: function () {
    var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return data;
  },
  save: function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, replacer));
  },
  clear: function() {
    localStorage.removeItem(STORAGE_KEY);
  }
}


// TODO: SHIP BUTTON COMPONENT

Vue.component('technology-button', {
  template: '#technology-button',
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function () {
      this.$emit('increase-technology', this.technology);
    }
  }
});


Vue.component('space-wreck-technology-button', {
  template: '#space-wreck-technology-button',
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function () {
      this.$emit('increase-technology', this.technology);
    }
  }
});


Vue.use(VuejsDialog);

// TODO: ANALYTICS???

var vm = new Vue({
  el: '#app',
  data: function() {
    return this.loadData(this);
  },
  methods: {
    initialData: function () {
      return {
        turn: 1,
        commands: [],
        constructionPoints: 0,
        colonyPoints: 0,
        mineralPoints: 0,
        bidPoints: 0,
        techs: {
          // TODO: TECHS
        },
        ships: {
          // TODO: SHIPS
        }
      }
    },
    // TODO: FUNCTIONS FOR EACH SHIP?
    loadData: function(production_sheet) {
      var isEmpty = Object.keys(spaceEmpiresStorage.fetch()).length === 0 &&
                                spaceEmpiresStorage.fetch().constructor === Object;
      if (isEmpty) {
        return this.initialData();
      };
      var data = spaceEmpiresStorage.fetch();
      // TODO: COMMAND FACTORY
      // TODO: Data Loading
      return data;
    },
    saveData: function() {
      var data = {
        turn: this.turn,
        // TODO: COMMANDS
        constructionPoints: this.constructionPoints,
        colonyPoints: this.colonyPoints,
        mineralPoints: this.mineralPoints,
        bidPoints: this.bidPoints,
        techs: {
          // TODO: SAVE TECHS
        },
        ships: {
          // TODO: SAVE SHIPS
        }
      };
      spaceEmpiresStorage.save(data);
    },
    clearAll: function() {
      spaceEmpiresStorage.clear();
      this._notifyInfo('Data cleaned.');
      location.reload();
    },
    doNothing: function() {
    },
    undo: function() {
      // TODO: UNDO
    },
    addColonyPoints: function () {
      if (this.colonyPoints <= 0) {
        this._notifyWarning('Colony Points must be more than 0');
        return;
      }

      this._executeCommand(new AddColonyPointsCommand(this, this.colonyPoints));
    },
    addMineralPoints: function(points) {
      if (points <= 0) {
        this._notifyWarning('Mineral Points must be more than 0');
        return;
      }

      this._executeCommand(new AddMineralPointsCommand(this, points));
    },
    addFiveMineralPoints: function () {
      this.addMineralPoints(5);
    },
    addTenMineralPoints: function () {
      this.addMineralPoints(10);
    },
    addFifteenMineralPoints: function () {
      this.addMineralPoints(15);
    },
    subtractBidPoints: function () {
      if (this.bidPoints > this.constructionPoints) {
        this._notifyWarning('You do not have enough CP for that bid.');
        return;
      }

      if (this.bidPoints < 0) {
        this._executeCommand('Your bid cannot be less than 0');
        return;
      }

      this._executeCommand(new SubtractBidPointsCommand(this, this.bidPoints));
      this.bidPoints = 0;
    },
    subtractMaintenancePoints: function () {
      if (this.maintenance > this.constructionPoints) {
        this._executeCommand(new SubtractMaintenancePointsCommand(this, this.constructionPoints));
      } else {
        this._executeCommand(new SubtractMaintenancePointsCommand(this, this.maintenance));
      }
    },
    endTurn: function() {
      if (this.turn >= 20) {
        this._notifyWarning('This is the last turn. Game Over!');
        return;
      }

      if (this.constructionPoints > 30) {
        this._notifyWarning('A maximum of 30 CP can be carried over into the next turn.');
        return;
      }

      this._executeCommand(new EndTurnCommand(this, this.turn));
    },
    increaseTurn() {
      this.turn += 1;
    },
    decreaseTurn() {
      if (this.turn <= 0) {
        this._notifyWarning('You are on the first turn.  You cannot go back further.');
        return;
      }
      this.turn -= 1;
    },
    increaseConstructionPoints: function(points) {
      this.constructionPoints += points;
    },
    decreaseConstructionPoints: function(points) {
      this.constructionPoints -= points;
    },
    // TODO: INCREASE/DECREASE TECHS
    increaseTechnologyCommand: function(technology) {
      console.log(technology);
      var commands = {
        // TECH COMMANDS
      }

      if (!this.hasSubtractedMaintenancePoints()) {
        this._notifyWarning('You cannot purchase technology until after subtracting maintenance.');
        return;
      }

      if (!technology.canIncrease(this.constructionPoints)) {
        this._notifyWarning('You cannot increase that technology.');
        return;
      }

      this._executeCommand(commands[technology.getName()]);
    },
    increaseSpaceWreckTechnologyCommand: function(technology) {
      // TODO: Do this part.
    },
    hasSubtractedMaintenancePoints: function() {
      var result = false;
      this.commands.forEach(function (command) {
        if (command instanceof SubtractMaintenancePointsCommand) {
          result = true;
        }
        if (command instanceof EndTurnCommand) {
          result = false;
        }
      });
      return result;
    },
    purchaseShipCommand: function(ship) {
      // TODO: Purchase ship command
    },
    purchaseShip: function(ship) {
      // TODO: Purchase ship
    },
    sellShip: function(ship) {
      // TODO: Sell ship
    },
    loseShipCommand: function(ship) {
      // TODO: Lose ship command
    },
    loseShip: function(ship) {
      // TODO: Lose ship
    },
    findShip: function(ship) {
      // TODO: Find ship
    },
    _increaseTechnology: function(technology) {
      technology.increaseLevel();
      this.decreaseConstructionPoints(technology.costCurrentLevel());
    },
    _decreaseTechnology: function(technology) {
      technology.decreaseLevel();
      this.increaseConstructionPoints(technology.costNextLevel());
    },
    // TODO: Space Wreck Tech
    _executeCommand: function(command) {
      command.do();
      this.commands.push(command);
      this.saveData();
      this._notifySuccess(command.toString());
      this.$ga.event('Command', command.toString());
    },
    _notifyOptions: function(duration=2000) {
      toastr.options = {
        'closeButton': false,
        'debug': false,
        'newestOnTop': true,
        'progressBar': false,
        'positionClass': 'toast-bottom-full-width',
        'preventDuplicates': true,
        'onclick': null,
        'showDuration': '50',
        'hideDuration': '1000',
        'timeOUt': duration,
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
      };
    },
    _notifySuccess: function(message) {
      this._notifyOptions();
      toastr.success(message);
    },
    _notifyWarning: function(message) {
      this._notifyOptions(4000);
      toastr.warning(message);
    },
    _notifyInfo: function(message) {
      this._notifyOptions();
      toastr.info(message);
    }
  },
  computed: {
    reverseCommands() {
      return this.commands.slice().reverse();
    },
    // TODO: Count ships
    maintenance() {
      var result = 0;
      // TODO: get ships
      return result;
    }
  }
});