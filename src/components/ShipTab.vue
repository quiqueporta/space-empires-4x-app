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
    <template v-if="groundUnits.length > 0">
      <b-row>
        <b-col class="section-header"><strong>Ground Units</strong></b-col>
      </b-row>
      <ShipRow
          v-for="ship in groundUnits"
          v-bind:key="ship.type"
          v-bind:ship="ship"
          v-bind:techs="techs"
          v-bind:psheet="psheet"></ShipRow>
    </template>
  </b-container>
</template>

<script>
import ShipRow from "./ShipRow.vue";

export default {
  name: "ShipTab",
  components: { ShipRow },
  props: [ 'ships', 'techs', 'psheet' ],
  computed: {
    nonGroupedShips: function() {
      return this.ships.filter(ship => !ship.grouped() && !ship.ground);
    },
    availableShips: function() {
      return this.ships.filter(ship => ship.grouped() && ship.requirementsMet(this.techs) && !ship.ground);
    },
    groundUnits: function() {
      return this.ships.filter(ship => ship.requirementsMet(this.techs) && ship.ground);

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