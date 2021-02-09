<template>
  <b-container fluid class="cp-tab">
    <b-form-row>
      <b-col sm="2" cols="3" class="label">Colony</b-col>
      <b-col sm="2" cols="3">
        <b-form-input v-model="psheet.colonyPoints" type="number" @focus.native="$event.target.select()" />
      </b-col>
      <b-col sm="1" cols="2">
        <b-button variant="primary" class="add-sub-button" v-on:click="addColonyPoints">+</b-button>
      </b-col>
      <b-col sm="2" cols="2"><h3><b-icon-check2-circle v-if="psheet.hasAddedColonyPoints()" variant="success"></b-icon-check2-circle></h3></b-col>
      <b-col sm="5" cols="2"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="3" class="label">Minerals</b-col>
      <b-col sm="2" cols="3"><b-button variant="primary" class="add-sub-button" v-on:click="addFiveMineralPoints">+5</b-button></b-col>
      <b-col sm="2" cols="3"><b-button variant="primary" class="add-sub-button" v-on:click="addTenMineralPoints">+10</b-button></b-col>
      <b-col sm="2" cols="3"><b-button variant="primary" class="add-sub-button" v-on:click="addFifteenMineralPoints">+15</b-button></b-col>
      <b-col sm="4" cols="0"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Space Wreck</b-col>
      <b-col sm="0" cols="2"></b-col>
      <b-col sm="4" cols="6"><b-button variant="primary" v-on:click="randomSpaceWreckTech">Random</b-button></b-col>
      <b-col sm="6" cols="0"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="3" class="label smaller">MS Pipeline</b-col>
      <b-col sm="2" cols="3">
        <b-form-input v-model="psheet.msPipelinePoints" type="number" @focus.native="$event.target.select()" />
      </b-col>
      <b-col sm="1" cols="2">
        <b-button variant="primary" class="add-sub-button" v-on:click="addMsPipelinePoints">+</b-button>
      </b-col>
      <b-col sm="2" cols="2"><h3><b-icon-check2-circle v-if="psheet.hasAddedMsPipelinePoints()" variant="success"></b-icon-check2-circle></h3></b-col>
      <b-col sm="5" cols="2"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Maintenance</b-col>
      <b-col sm="2" cols="2"><h3 class="maint-val"><b-badge variant="dark">{{ psheet.maintenance }}</b-badge></h3></b-col>
      <b-col sm="1" cols="2"><b-button variant="warning" class="add-sub-button" v-on:click="subtractMaintenancePoints">-</b-button></b-col>
      <b-col sm="2" cols="2"><h3><b-icon-check2-circle v-if="psheet.hasSubtractedMaintenancePoints()" variant="success"></b-icon-check2-circle></h3></b-col>
      <b-col sm="5" cols="1"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="3" class="label">Bid</b-col>
      <b-col sm="2" cols="3"><b-form-input v-model="psheet.bidPoints" type="number" @focus.native="$event.target.select()" /></b-col>
      <b-col sm="1" cols="2">
        <b-button variant="warning" class="add-sub-button" v-on:click="subtractBidPoints">-</b-button>
      </b-col>
      <b-col sm="2" cols="2"><h3><b-icon-check2-circle v-if="psheet.hasSubtractedBidPoints()" variant="success"></b-icon-check2-circle></h3></b-col>
      <b-col sm="5" cols="2"></b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import Vue from 'vue';

import { AddColonyPointsCommand, AddMsPipelinePointsCommand, AddMineralPointsCommand,
         SubtractBidPointsCommand, SubtractMaintenancePointsCommand, IncreaseTechCommand
         } from '../models/commands';

import { BIconCheck2Circle } from 'bootstrap-vue';

Vue.component('BIconCheck2Circle', BIconCheck2Circle);

export default {
  name: "CPTab",
  props: [ 'psheet' ],
  methods: {
    addColonyPoints: function () {
      if (this.psheet.hasAddedColonyPoints()) {
        this.psheet._notifyInfo('You have already added colony points this turn!');
        return;
      }

      if (this.psheet.colonyPoints <= 0) {
        this.psheet._notifyWarning('Colony Points must be more than 0');
        return;
      }

      this.psheet._executeCommand(new AddColonyPointsCommand(this.psheet, this.psheet.colonyPoints));
    },
    addMsPipelinePoints: function () {
      if (this.psheet.hasAddedMsPipelinePoints()) {
        this.psheet._notifyInfo('You have already added MS Pipeline points this turn!');
        return;
      }

      if (this.psheet.msPipelinePoints <= 0) {
        this.psheet._notifyWarning('MS Pipeline Points must be more than 0');
        return;
      }

      this.psheet._executeCommand(new AddMsPipelinePointsCommand(this.psheet, this.psheet.msPipelinePoints));
    },
    addMineralPoints: function(points) {
      if (points <= 0) {
        this.psheet._notifyWarning('Mineral Points must be more than 0');
        return;
      }

      this.psheet._executeCommand(new AddMineralPointsCommand(this.psheet, points));
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
    randomSpaceWreckTech: function () {
      var swTable = {
        0: 'Ship Yard',
        1: 'Ship Size', 2: 'Ship Size',
        3: 'Attack',    4: 'Attack',
        5: 'Defense',   6: 'Defense',
        7: 'Tactics',
        8: 'Move',      9: 'Move'
      }
      var randomTech = swTable[Math.floor(Math.random() * 10)];
      var tech = this.psheet.findTechByTitle(randomTech);

      if (tech.onMaxLevel()) {
        this.psheet._notifyInfo('Space Wreck provided ' + randomTech +', but you are already at maximum.');
        return;
      }

      this.psheet._executeCommand(new IncreaseTechCommand(this.psheet, tech, tech.currentLevel+1, true));
    },
    subtractBidPoints: function () {
      if (this.psheet.hasSubtractedBidPoints()) {
        this.psheet._notifyInfo('You have already subtracted bid points this turn (or did not need to)!');
        return;
      }

      if (this.psheet.bidPoints > this.psheet.constructionPoints) {
        this.psheet._notifyWarning('You do not have enough CP for that bid.');
        return;
      }

      if (this.psheet.bidPoints < 0) {
        this.psheet._executeCommand('Your bid cannot be less than 0');
        return;
      }

      this.psheet._executeCommand(new SubtractBidPointsCommand(this.psheet, this.psheet.bidPoints));
      this.psheet.bidPoints = 0;
    },
    subtractMaintenancePoints: function () {
      if (this.psheet.hasSubtractedMaintenancePoints()) {
        this.psheet._notifyInfo('You have already subtracted maintenance points this turn (or did not need to)!');
        return;
      }

      if (this.psheet.maintenance > this.psheet.constructionPoints) {
        this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.psheet.constructionPoints));
      }

      this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.psheet.maintenance));
    }
  }
};
</script>

<style scoped>
.cp-tab >>> .form-row {
  padding-top: 10px;
  padding-bottom: 10px;
}

.cp-tab >>> .label {
  text-align: right;
  vertical-align: middle;
  padding-top: 5px;
}

.cp-tab >>> .add-sub-button {
  width: 50px;
}

.cp-tab >>> .maint-val {
  text-align: center;
}

.cp-tab >>> .smaller {
  font-size: .85rem;
}
</style>