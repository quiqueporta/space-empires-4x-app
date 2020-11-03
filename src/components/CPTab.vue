<template>
  <b-container>
    <b-form-row>
      <b-col><b-form-input v-model="psheet.colonyPoints" :type="number" /></b-col>
      <b-col>
        <b-button variant="primary" v-on:click="addColonyPoints">Add Colony Points</b-button>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col><b-button variant="primary" v-on:click="addFiveMineralPoints">Add 5 Mineral Points</b-button></b-col>
      <b-col><b-button variant="primary" v-on:click="addTenMineralPoints">Add 10 Mineral Points</b-button></b-col>
      <b-col><b-button variant="primary" v-on:click="addFifteenMineralPoints">Add 15 Mineral Points</b-button></b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-button variant="warning" v-on:click="subtractMaintenancePoints">
          Subtract Maintenance Points
          <b-badge variant="light">{{ psheet.maintenance }}</b-badge>
        </b-button>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col><b-form-input v-model="psheet.bidPoints" :type="number" /></b-col>
      <b-col>
        <b-button variant="warning" v-on:click="subtractBidPoints">Subtract Bid Points</b-button>
      </b-col>
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
.form-row {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>