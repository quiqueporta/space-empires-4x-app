<template>
  <b-container fluid class="cp-tab">
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Colony Points</b-col>
      <b-col sm="1" cols="3">
        <b-form-input v-model="psheet.colonyPoints" type="number" />
      </b-col>
      <b-col sm="1" cols="2">
        <b-button variant="primary" class="add-sub-button" v-on:click="addColonyPoints">+</b-button>
      </b-col>
      <b-col sm="8" cols="3"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Mineral Points</b-col>
      <b-col sm="1" cols="2"><b-button variant="primary" class="add-sub-button" v-on:click="addFiveMineralPoints">+5</b-button></b-col>
      <b-col sm="1" cols="2"><b-button variant="primary" class="add-sub-button" v-on:click="addTenMineralPoints">+10</b-button></b-col>
      <b-col sm="1" cols="2"><b-button variant="primary" class="add-sub-button" v-on:click="addFifteenMineralPoints">+15</b-button></b-col>
      <b-col sm="7" cols="2"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Maintenance</b-col>
      <b-col sm="1" cols="3"><h3 class="maint-val"><b-badge variant="dark">{{ psheet.maintenance }}</b-badge></h3></b-col>
      <b-col sm="1" cols="2"><b-button variant="warning" class="add-sub-button" v-on:click="subtractMaintenancePoints">-</b-button></b-col>
      <b-col sm="8" cols="3"></b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="2" cols="4" class="label">Bid Points</b-col>
      <b-col sm="1" cols="3"><b-form-input v-model="psheet.bidPoints" type="number" /></b-col>
      <b-col sm="1" cols="2">
        <b-button variant="warning" class="add-sub-button" v-on:click="subtractBidPoints">-</b-button>
      </b-col>
      <b-col sm="8" cols="3"></b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import { AddColonyPointsCommand, AddMineralPointsCommand, SubtractBidPointsCommand,
         SubtractMaintenancePointsCommand } from '../models/commands';

export default {
  name: "CPTab",
  props: [ 'psheet' ],
  methods: {
    addColonyPoints: function () {
      if (this.psheet.colonyPoints <= 0) {
        this.psheet._notifyWarning('Colony Points must be more than 0');
        return;
      }

      this.psheet._executeCommand(new AddColonyPointsCommand(this.psheet, this.psheet.colonyPoints));
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
    subtractBidPoints: function () {
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
      if (this.psheet.maintenance > this.psheet.constructionPoints) {
        this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.psheet.constructionPoints));
      } else {
        this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.psheet.maintenance));
      }
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
</style>