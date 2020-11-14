<template>
  <b-container fluid class="ship-tab">
    <b-table :items="allShips"
             :fields="fields" 
             :filter-function="shipFilter"
             :filter="'x'"
             thead-class="d-none"
             tbody-tr-class="ship-row">
      <template #cell(ship)="data">
        <div class="ship-name text-right">
          {{ shipLabel(data.item) }} <b-badge :variant="shipBadgeVariant(data.item)">{{ data.item.currentCount }}</b-badge>
        </div>
      </template>

      <template #cell(buy)="data">
        <b-button variant="primary" size="sm" v-on:click="purchaseShip(data.item)" v-bind:disabled="disableBuy(data.item)">Buy ({{ data.item.cost }})</b-button>
      </template>

      <template #cell(lose)="data">
        <b-button variant="primary" size="sm" v-on:click="loseShip(data.item)" v-bind:disabled="disableLose(data.item)">Lose</b-button>
      </template>

      <template #cell(upgrade)="data">
        <b-button v-if="data.item.upgradable()"
                  variant="primary"
                  size="sm"
                  v-on:click="upgradeShip(data.item)"
                  v-bind:disabled="disableUpgrade(data.item)">
          Upgr. ({{ data.item.hullSize }})
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { PurchaseShipCommand, LoseShipCommand, UpgradeShipCommand } from "../models/commands";

export default {
  name: "ShipTab",
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