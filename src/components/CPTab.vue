<template>
  <div class="container-fluid">
      <div class="row p-1">
          <div class="col p-1">
              <div class="form-inline">
                  <div class="form-group">
                      <input type="number" class="form-control-lg pad-r" v-model="colonyPoints">
                  </div>
                      <button type="button" class="btn btn-primary" v-on:click="addColonyPoints">Add Colony Points</button>
              </div>
          </div>
      </div>
      <div class="row p-1">
          <div class="col p-1">
              <button type="button" class="btn btn-primary" v-on:click="addFiveMineralPoints">Add 5 Mineral Points</button>
          </div>
          <div class="col p-1">
              <button type="button" class="btn btn-primary" v-on:click="addTenMineralPoints">Add 10 Mineral Points</button>
          </div>
          <div class="col p-1">
              <button type="button" class="btn btn-primary" v-on:click="addFifteenMineralPoints">Add 15 Mineral Points</button>
          </div>
      </div>
      <div class="row p-1">
          <div class="col p-1">
              <button type="button" class="btn btn-warning" v-on:click="subtractMaintenancePoints">
                  Subtract Maintenance Points
                  <span class="badge badge-light">{{ maintenance }}</span>
              </button>
          </div>
      </div>
      <div class="row p-1">
          <div class="col p-1">
              <div class="form-inline">
                  <div class="form-group">
                      <input type="number" v-model="bidPoints" class="form-control-lg">
                  </div>
                  <button type="button" class="btn btn-warning" v-on:click="subtractBidPoints">Subtract Bid Points</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { AddColonyPointsCommand, AddMineralPointsCommand, SubtractBidPointsCommand,
         SubtractMaintenancePointsCommand } from '../models/commands';

export default {
  name: "CPTab",
  props: [ 'colonyPoints', 'bidPoints', 'constructionPoints', 'maintenance', 'psheet' ],
  methods: {
    addColonyPoints: function () {
      if (this.colonyPoints <= 0) {
        this.psheet._notifyWarning('Colony Points must be more than 0');
        return;
      }

      this.psheet._executeCommand(new AddColonyPointsCommand(this.psheet, this.colonyPoints));
    },
    addMineralPoints: function(points) {
      if (points <= 0) {
        this._notifyWarning('Mineral Points must be more than 0');
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
      if (this.psheet.bidPoints > this.constructionPoints) {
        this.psheet._notifyWarning('You do not have enough CP for that bid.');
        return;
      }

      if (this.psheet.bidPoints < 0) {
        this.psheet._executeCommand('Your bid cannot be less than 0');
        return;
      }

      this.psheet._executeCommand(new SubtractBidPointsCommand(this.psheet, this.bidPoints));
      this.bidPoints = 0;
    },
    subtractMaintenancePoints: function () {
      if (this.maintenance > this.constructionPoints) {
        this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.constructionPoints));
      } else {
        this.psheet._executeCommand(new SubtractMaintenancePointsCommand(this.psheet, this.maintenance));
      }
    }
  }
};
</script>