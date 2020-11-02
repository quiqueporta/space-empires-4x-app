<template>
  <div class="container-fluid">
    <div class="row p-1">
        <div class="col p-1 text-center"><strong>Buy</strong></div>
        <div class="col p-1 text-center"><strong>Lose</strong></div>
    </div>
    <ShipRow v-for="ship in ships"
             v-bind:key="ship.type"
             v-bind:techs="techs"
             v-bind:ship="ship"
             v-bind:quantity="ship.currentCount"
             v-on:purchase-ship="purchaseShipCommand"
             v-on:lose-ship="loseShipCommand" />
  </div>
</template>

<script>
import { PurchaseShipCommand, LoseShipCommand } from "../models/commands";
import ShipRow from "./ShipRow.vue";

export default {
  name: "ShipTab",
  components: { ShipRow },
  props: [ 'ships', 'techs', 'psheet' ],
  methods: {
    purchaseShipCommand: function(ship) {
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
    loseShipCommand: function(ship) {
      if (ship.currentCount <= 0) {
        this.psheet._notifyWarning("You don't have any more " + ship.name + "s to lose.");
        return;
      }

      this.psheet._executeCommand(new LoseShipCommand(this.psheet, ship));
    }
  }
}
</script>