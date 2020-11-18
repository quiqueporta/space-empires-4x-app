<template>
  <b-container fluid class="ship-tab">
    <b-row>
      <b-col class="section-header"><strong>Non-Grouped Ships</strong></b-col>
    </b-row>
    <ShipRow
        v-for="ship in nonGroupedShips"
        v-bind:key="ship.type"
        v-bind:ship="ship"
        v-bind:techs="techs"
        v-bind:psheet="psheet"></ShipRow>
    <b-row>
      <b-col class="section-header"><strong>Grouped Ships</strong></b-col>
    </b-row>
    <ShipRow
        v-for="ship in availableShips"
        v-bind:key="ship.type"
        v-bind:ship="ship"
        v-bind:techs="techs"
        v-bind:psheet="psheet"></ShipRow>
  </b-container>
</template>

<script>
import { PurchaseShipCommand, LoseShipCommand, UpgradeShipCommand } from "../models/commands";
import ShipRow from "./ShipRow.vue";

export default {
  name: "ShipTab",
  components: { ShipRow },
  props: [ 'ships', 'techs', 'psheet' ],
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
    upgradeShip: function(ship) {
      if (ship.hullSize > this.psheet.constructionPoints) {
        this.psheet._notifyWarning("You don't have enough CPs for this upgrade.");
        return;
      }

      this.psheet._executeCommand(new UpgradeShipCommand(this.psheet, ship));
    },
    shipLabel: function(ship) {
      return ship.name;
    },
    shipFilter: function(ship, _filter) {
      return ship.requirementsMet(this.techs);
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
    disableUpgrade: function(ship) {
      return !ship.canUpgrade(this.psheet.constructionPoints);
    }
  },
  computed: {
    fields: function() {
      return ['ship', 'buy', 'lose', 'upgrade'];
    },
    nonGroupedShips: function() {
      return this.ships.filter(ship => !ship.grouped());
    },
    availableShips: function() {
      return this.ships.filter(ship => ship.grouped() && ship.requirementsMet(this.techs));
    },
    allShips: function() {
      return this.ships;
    }
  }
}
</script>

<style scoped>
.ship-tab >>> .ship-row td {
  vertical-align: middle;
}

.section-header {
  font-weight: bold;
  background-color: lightskyblue;
}

@media only screen and (max-width: 400px) {
  .ship-tab {
    padding-left: 5px;
    padding-right: 5px;
  }

  .ship-tab >>> .table td {
    padding: 0.25rem;
  }
}
</style>