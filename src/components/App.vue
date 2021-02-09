<template>
  <div id="app">
    <b-container fluid class="main-app">
      <b-row align-v="center">
        <b-col cols="9">
          <h2>Turn {{ turn }} - CPs <span class="badge badge-info">{{ constructionPoints }}</span></h2>
        </b-col>
        <b-col class="right" cols="3">
          <b-button v-b-modal.about-modal><b-icon-question-circle-fill aria-label="Help"></b-icon-question-circle-fill></b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <button v-confirm="{ok: clearAll, cancel: doNothing, message: 'Are you sure?'}" class="btn btn-danger">Clear All</button>
          <button type="button" class="btn btn-dark" v-on:click="endTurn">End Turn</button>
        </b-col>
      </b-row>
      <b-row>
        <b-tabs content-class="mt-3">
          <b-tab title="CPs" active>
            <CPTab v-bind:psheet="this" />
          </b-tab>
          <b-tab title="Tech">
            <TechTab v-bind:psheet="this"
                      v-bind:techs="techs" />
          </b-tab>
          <b-tab title="Ships">
            <ShipTab v-bind:psheet="this"
                       v-bind:ships="ships"
                       v-bind:techs="techs" />
          </b-tab>
          <b-tab title="History">
            <HistoryTab v-bind:psheet="this" />
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
    <b-modal id="about-modal" title="About this App" ok-only>
      <p>This app was originally created by Quique Porta (<a href="https://twitter.com/quiqueportac">@quiqueportac</a>).</p>
      <p>See <a href="http://http://space-empires-4x-app.herokuapp.com/">the original app</a>.</p>
      <p>Source code can be found on <a href="https://github.com/quiqueporta/space-empires-4x-app">Github</a>.</p>
      <p>Email Quique at <a href="mailto:quiqueporta@gmail.com">quiqueporta@gmail.com</a>.</p>
      <hr />
      <p>App forked and extended by Scott Lewis.</p>
      <p>Forked source code can also be found on <a href="https://github.com/sigmazero13/space-empires-4x-app">Github</a>.</p>
      <p>Email Scott at <a href="mailto:sigmazero13@gmail.com">sigmazero13@gmail.com</a>.</p>
      <p>v3.2.0</p>
    </b-modal>
  </div>  
</template>

<script>
import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import VueAnalytics from 'vue-analytics';

import { BootstrapVue } from 'bootstrap-vue';
import { BIconQuestionCircleFill } from 'bootstrap-vue';

import CPTab from "./CPTab.vue";
import TechTab from "./TechTab.vue";
import ShipTab from "./ShipTab.vue";
import HistoryTab from "./HistoryTab.vue";

import { Ship, ShipGroup } from '../models/ships';
import { TechnologyProgression } from '../models/technologies';
import { CommandFactory, SubtractMaintenancePointsCommand,
         EndTurnCommand, AddColonyPointsCommand, AddMsPipelinePointsCommand,
         SubtractBidPointsCommand} from '../models/commands';

import TECH_DATA from '../assets/techs.yaml';
import SHIP_DATA from '../assets/ships.yaml';

var STORAGE_KEY = 'space-empires-4x-v3';

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

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: "App",
  components: { CPTab, TechTab, ShipTab, HistoryTab, BIconQuestionCircleFill },
  data: function() {
    return this.loadData(this);
  },
  methods: {
    initialData: function () {
      var techs = TECH_DATA['tech'].map(tech => new TechnologyProgression(tech));
      var ships = SHIP_DATA['ship'].map(ship => new Ship(ship, techs));
      return {
        turn: 1,
        commands: [],
        constructionPoints: 0,
        colonyPoints: 20,
        msPipelinePoints: 0,
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
      data.techs = data.techs.map(tech => Object.assign(new TechnologyProgression(), JSON.parse(tech)));

      data.ships = data.ships.map(ship => {
        var ship_obj = JSON.parse(ship);
        var groups = {};
        for (var group in ship_obj._groups) {
          groups[group] = Object.assign(new ShipGroup(), ship_obj._groups[group]);
        }
        ship_obj._groups = groups;
        return Object.assign(new Ship(), ship_obj)
      });
      
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
        msPipelinePoints: this.msPipelinePoints,
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

      this._executeCommand(new EndTurnCommand(this, this.turn, this.constructionPoints));
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
    hasAddedColonyPoints: function() {
      return this.hasAppliedPointOption(AddColonyPointsCommand, false);
    },
    hasAddedMsPipelinePoints: function() {
      return this.hasAppliedPointOption(AddMsPipelinePointsCommand, false);
    },
    hasSubtractedMaintenancePoints: function() {
      var maintVal = this.maintenance;
      return this.hasAppliedPointOption(SubtractMaintenancePointsCommand, maintVal <= 0);
    },
    hasSubtractedBidPoints: function () {
      return this.hasAppliedPointOption(SubtractBidPointsCommand, false);
    },
    hasAppliedPointOption: function(commandToCheck, defaultResult) {
      var result = defaultResult;

      this.commands.forEach(function (command) {
        if (command instanceof commandToCheck) {
          result = true;
        } else if (command instanceof EndTurnCommand) {
          result = defaultResult;
        }
      });
      return result;
    },
    purchaseShip: function(ship, group) {
      group = ship.increaseCount(group, this.techs);
      this.decreaseConstructionPoints(ship.cost);
      return group;
    },
    sellShip: function(ship, group) {
      ship.decreaseCount(group);
      this.increaseConstructionPoints(ship.cost);
    },
    loseShip: function(ship, group) {
      ship.decreaseCount(group);
    },
    regainShip: function(ship, group) {
      ship.increaseCount(group);
    },
    upgradeGroup: function(ship, group) {
      this.decreaseConstructionPoints(ship.upgradeCost(group));
      return ship.upgrade(this.techs, group);
    },
    downgradeGroup: function(ship, group, techs) {
      this.increaseConstructionPoints(ship.upgradeCost(group));
      ship.downgrade(techs, group);
    },
    autoUpgradeShips: function() {
      for (var ship of this.ships) {
        if (ship.autoUpgrade) {
          ship.upgradeAll(this.techs);
        }
      }
    },
    findTechByTitle: function(title) {
      for (var tech of this.techs) {
        if (title == tech.title) {
          return tech;
        }
      }

      return;
    },
    splitGroup: function(ship, groupLabel, count, newGroupLabel) {
      return ship.splitGroup(groupLabel, count, newGroupLabel);
    },
    mergeGroups: function(ship, fromGroup, toGroup) {
      return ship.mergeGroups(fromGroup, toGroup);
    },
    _executeCommand: function(command) {
      command.do();
      this.commands.push(command);
      this.saveData();
      this._notifySuccess(command.toString());
      this.$ga.event('Command', command.toString());
    },
    _notifyOptions: function(variant, message, duration=2000) {
      this.$bvToast.toast(message, {
        variant: variant,
        toaster: 'b-toaster-bottom-full',
        autoHideDelay: duration,
        noCloseButton: true,
      });
    },
    _notifySuccess: function(message) {
      this._notifyOptions('success', message);
    },
    _notifyWarning: function(message) {
      this._notifyOptions('warning', message, 4000);
    },
    _notifyInfo: function(message) {
      this._notifyOptions('info', message);
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
.tabs {
  padding-top: 15px;
  width: 90%
}
.pad-r {
  margin-right: 10px;
}

@media only screen and (max-width: 400px) {
  .tabs {
    width:100%
  }
}
</style>

