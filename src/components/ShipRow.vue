<template>
  <b-row v-if="ship.requirementsMet(techs)">
    <b-col>
      <b-button variant="success" v-on:click="purchaseShip">
        <small v-if="ship.shortName() != ''">{{ ship.shortName() }} - </small>{{ ship.name}} <small>({{ ship.cost }})</small>
        <b-badge variant="light">{{ quantity }}</b-badge>
      </b-button>
    </b-col>
    <b-col>
      <b-button variant="danger" v-on:click="loseShip">{{ ship.name }}</b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ShipRow",
  props: ['ship', 'quantity', 'techs'],
  methods: {
    purchaseShip: function() {
      this.$emit('purchase-ship', this.ship);
    },
    loseShip: function() {
      this.$emit('lose-ship', this.ship);
    }
  }
};
</script>