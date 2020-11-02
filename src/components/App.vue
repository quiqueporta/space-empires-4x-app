<template>
  <div id="app">
    <div class="container-fluid">
        <div class="row p-1">
            <div class="col">
                <h2>Turn {{ turn }} - CPs <span class="badge badge-info">{{ constructionPoints }}</span></h2>
                <button v-confirm="{ok: clearAll, cancel: doNothing, message: 'Are you sure?'}" class="btn btn-danger">Clear All</button>
                <button type="button" class="btn btn-dark" v-on:click="endTurn">End Turn</button>
            </div>
        </div>
        <div class="row p-1">
            <div class="col">
                <ul class="nav nav-tabs" id="SpaceEmpiresTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="cp-tab" data-toggle="tab" href="#cp" role="tab" aria-controls="cp" aria-selected="true">CPs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="technologies-tab" data-toggle="tab" href="#technologies" role="tab" aria-controls="technologies" aria-selected="false">Tech</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="ships-tab" data-toggle="tab" href="#ships" role="tab" aria-controls="ships" aria-selected="false">Ships</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="commands-tab" data-toggle="tab" href="#commands" role="tab" aria-controls="commands" aria-selected="false">History</a>
                    </li>
                </ul>

                <div class="tab-content" id="spaceEmpiresContent">
                    <div class="tab-pane fade show active" id="cp" role="tabpanel" aria-labelledby="cp-tab">
                        <CPTab v-bind:psheet="this" />
                    </div>

                    <div class="tab-pane fade" id="technologies" role="tabpanel" aria-labelledby="technologies-tab">
                        <TechTab v-bind:psheet="this"
                                 v-bind:techs="techs" />
                    </div>

                    <div class="tab-pane fade container" id="ships" role="tabpanel" aria-labelledby="ships-tab">
                        <ShipTab v-bind:psheet="this"
                                 v-bind:ships="ships"
                                 v-bind:techs="techs" />
                    </div>

                    <div class="tab-pane fade" id="commands" role="tabpanel" aria-labelledby="commands-tab">
                        <HistoryTab v-bind:psheet="this" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>  
</template>

<script>
import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import VueAnalytics from 'vue-analytics';

import CPTab from "./CPTab.vue";
import TechTab from "./TechTab.vue";
import ShipTab from "./ShipTab.vue";
import HistoryTab from "./HistoryTab.vue";

import toastr from 'toastr';

import { Ship } from '../models/ships';
import { TechnologyProgression } from '../models/technologies';
import { CommandFactory, SubtractMaintenancePointsCommand,
         EndTurnCommand } from '../models/commands';

import DATA from '../assets/tech_ships.yaml';

var STORAGE_KEY = 'space-empires-4x-v3-sz13'

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

Vue.use(VuejsDialog);

Vue.use(VueAnalytics, {
  id: 'UA-115639837-1',
  autoTracking: {
    screenview: true
  }
});

export default {
  name: "App",
  components: { CPTab, TechTab, ShipTab, HistoryTab },
   data: function() {
    return this.loadData(this);
  },
  methods: {
    initialData: function () {
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
    purchaseShip: function(ship) {
      ship.increaseCount();
      this.decreaseConstructionPoints(ship.cost);
    },
    sellShip: function(ship) {
      ship.decreaseCount();
      this.increaseConstructionPoints(ship.cost);
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
    maintenance() {
      var result = 0;
      for (var ship of this.ships) {
        result += ship.totalMaintenance();
      }
      return result;
    }
  }
}
</script>

<style>
.pad-r {
  margin-right: 10px;
}
</style>