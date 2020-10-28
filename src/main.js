import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import VueAnalytics from 'vue-analytics'
import toastr from 'toastr'

import { Ship } from './ships';
import { TechnologyProgression } from './technologies';
import { CommandFactory, AddColonyPointsCommand, AddMineralPointsCommand,
         SubtractBidPointsCommand, SubtractMaintenancePointsCommand,
         EndTurnCommand, IncreaseTechCommand, PurchaseShipCommand,
         LoseShipCommand } from './commands';

import DATA from './assets/tech_ships.yaml';

// TODO: import more commands

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

Vue.component('ship-button', {
  template: '#ship-button',
  props: ['ship', 'quantity','techs'],
  methods: {
    purchaseShip: function () {
      this.$emit('purchase-ship', this.ship);
    },
    loseShip: function () {
      this.$emit('lose-ship', this.ship);
    }
  }
})

Vue.component('technology-button', {
  template: '#technology-button',
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function () {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': false});
    }
  }
});


Vue.component('space-wreck-technology-button', {
  template: '#space-wreck-technology-button',
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function () {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': true});
    }
  }
});


Vue.use(VuejsDialog);

Vue.use(VueAnalytics, {
  id: 'UA-115639837-1',
  autoTracking: {
    screenview: true
  }
});

var vm = new Vue({
  el: '#app',
  data: function() {
    return this.loadData(this);
  },
  methods: {
    initialData: function () {
      console.log(DATA);
      var techs = DATA['tech'].map(tech => new TechnologyProgression(tech));
      var ships = DATA['ship'].map(ship => new Ship(ship));
      return {
        turn: 1,
        commands: [],
        constructionPoints: 0,
        colonyPoints: 0,
        mineralPoints: 0,
        bidPoints: 0,
        techs: techs,
        ships: ships
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
      var tech_data = data.techs.map(tech => Object.assign(new TechnologyProgression(), JSON.parse(tech)));
      data.techs = tech_data;

      var ship_data = data.ships.map(ship => Object.assign(new Ship(), JSON.parse(ship)));
      data.ships = ship_data;
      
      var commandFactory = new CommandFactory();
      
      data.commands = data.commands.map(function(command) { return commandFactory.create(production_sheet, data, command.name, command) });
      
      return data;
    },
    saveData: function() {
      var tech_data = this.techs.map(tech => JSON.stringify(tech));
      var ship_data = this.ships.map(ship => JSON.stringify(ship));
      var data = {
        turn: this.turn,
        commands: this.commands.map(function(command) { return command.toDict();}),
        constructionPoints: this.constructionPoints,
        colonyPoints: this.colonyPoints,
        mineralPoints: this.mineralPoints,
        bidPoints: this.bidPoints,
        techs: tech_data,
        ships: ship_data
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
      if (this.commands.length <= 0) {
        return;
      }

      var command = this.commands.pop();
      command.undo();
      this.saveData();
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
    increaseTechnologyCommand: function(tech_info) {
      var technology = tech_info['technology'];
      var wreck = tech_info['wreck'];

      if (!wreck && !this.hasSubtractedMaintenancePoints()) {
        this._notifyWarning('You cannot purchase technology until after subtracting maintenance.');
        return;
      }

      if (technology.onMaxLevel()) {
        this._notifyWarning(technology.title + ' is already at maximum.');
        return;
      } else if (!wreck && !technology.canIncrease(this.constructionPoints)) {
        this._notifyWarning('You do not have enough CP to increase ' + technology.title + '.');
        return;
      }

     this._executeCommand(new IncreaseTechCommand(this, technology, wreck));
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
      if (!this.hasSubtractedMaintenancePoints()) {
        this._notifyWarning('You cannot purchase ships until after subtracting maintenance.');
        return;
      }

      if (!ship.requirementsMet(this.techs)) {
        missing = ship.missingRequirements(this.techs);
        warning = missing.map ( m => "You need " + m + " technology.").join("<br/>");
        this._notifyWarning(warning);
        return;
      }

      if (ship.cost > this.constructionPoints) {
        this._notifyWarning('You do not have enough CPs');
        return;
      };

      this._executeCommand(new PurchaseShipCommand(this, ship));
    },
    purchaseShip: function(ship) {
      ship.increaseCount();
      this.decreaseConstructionPoints(ship.cost);
    },
    sellShip: function(ship) {
      ship.decreaseCount();
      this.increaseConstructionPoints(ship.cost);
    },
    loseShipCommand: function(ship) {
      if (ship.currentCount <= 0) {
        this._notifyWarning("You don't have any more " + ship.name + "s to lose.");
        return;
      }

      this._executeCommand(new LoseShipCommand(this, ship));
    },
    loseShip: function(ship) {
      ship.decreaseCount();
    },
    regainShip: function(ship) {
      ship.increaseCount();
    },
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
      if (this.commands === undefined) {
        this.commands = [];
      }
      return this.commands.slice().reverse();
    },
    // TODO: Count ships
    maintenance() {
      var result = 0;
      for (var ship of this.ships) {
        result += ship.totalMaintenance();
      }
      return result;
    }
  }
});