<template >
  <div v-if="ship.grouped('BOB')">
    <b-row>
      <b-col cols="5" class="ship-name">{{ ship.name }}</b-col>
      <b-col cols="3">
        <b-button block variant="primary" size="sm" v-on:click="purchaseShip(ship)" v-bind:disabled="disableBuy(ship)">Buy ({{ ship.cost }})</b-button>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
    <div
        v-for="group in ship.groups()"
        v-bind:key="group.label">
      <b-row>
        <b-col cols="5" class="ship-name">{{group.label}} <b-badge variant="primary">{{group.count}}</b-badge></b-col>
        <b-col cols="3">
          <b-button block variant="primary" size="sm" v-on:click="purchaseShip(ship)" v-bind:disabled="disableBuy(ship)">Buy ({{ ship.cost }})</b-button>
        </b-col>
        <b-col cols="3">
          <b-button block variant="danger" size="sm" v-on:click="loseShip(ship)" v-bind:disabled="disableLose(ship)">Lose</b-button>
        </b-col>
        <b-col cols="1">
          <b-icon-caret-down-square></b-icon-caret-down-square>
        </b-col>
      </b-row>
      <b-row>
        <b-col>{{ group.techString() }}</b-col>
      </b-row>
    </div>
  </div>
  <b-row v-else align-v="center" align-h="center">
    <b-col cols="5" class="ship-name">{{ ship.name }} <b-badge :variant="shipBadgeVariant(ship)">{{ ship.currentCount }}</b-badge></b-col>
    <b-col cols="3">
      <b-button block variant="primary" size="sm" v-on:click="purchaseShip(ship)" v-bind:disabled="disableBuy(ship)">Buy ({{ ship.cost }})</b-button>
    </b-col>
    <b-col cols="3">
      <b-button block variant="danger" size="sm" v-on:click="loseShip(ship)" v-bind:disabled="disableLose(ship)">Lose</b-button>
    </b-col>
    <b-col cols="1"></b-col>
  </b-row>
</template>


<script>
import { PurchaseShipCommand, LoseShipCommand, UpgradeShipCommand } from "../models/commands";
import { BIconCaretDownSquare } from 'bootstrap-vue';

export default {
  name: "ShipRow",
  components: { BIconCaretDownSquare },
  props: [ 'ship', 'techs', 'psheet' ],
  methods: {
    purchaseShip: function(ship) {
      if (!this.psheet.hasSubtractedMaintenancePoints()) {
        this.psheet._notifyWarning('You cannot purchase ships until after subtracting maintenance.');
        return;
      }

      if (!ship.requirementsMet(this.techs)) {
        missing = ship.missingRequirements(this.techs);
        warning = missing.map ( m => "You need " + m + " technology.").join("<br/>");
        this.psheet._notifyWarning(warning);
        return;
      }

      if (ship.cost > this.psheet.constructionPoints) {
        this.psheet._notifyWarning('You do not have enough CPs');
        return;
      };

      this.psheet._executeCommand(new PurchaseShipCommand(this.psheet, ship));
    },
    loseShip: function(ship) {
      if (ship.currentCount <= 0) {
        this.psheet._notifyWarning("You don't have any more " + ship.name + "s to lose.");
        return;
      }

      this.psheet._executeCommand(new LoseShipCommand(this.psheet, ship));
    },
    shipBadgeVariant: function(ship) {
      if (ship.currentCount > 0) {
        return 'success';
      }

      return 'secondary';
    },
    disableBuy: function(ship) {
      return !(this.psheet.hasSubtractedMaintenancePoints() && ship.canPurchase(this.psheet.constructionPoints))
    },
    disableLose: function(ship) {
      return ship.currentCount <= 0;
    },
  }
}
</script>

<style scoped>
.ship-name {
  text-align: right;
  padding-right: 5px;
}

div.row {
  padding-top: 3px;
  padding-bottom: 3px;
}

@media only screen and (max-width: 400px) {
  div.row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .row div {
    padding-left: 2px;
    padding-right: 2px;
  }

  .row div button {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 0.85rem;
  }
}
</style>