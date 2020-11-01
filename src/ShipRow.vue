<template>
  <div class="row p-1" v-if="ship.requirementsMet(techs)">
        <div class="col p-1">
            <button type="button" class="btn btn-success btn-block" v-on:click="purchaseShip">
                <small v-if="ship.shortName() != ''">{{ ship.shortName() }} - </small>{{ ship.name }} <small>({{ ship.cost }})</small>
                <span class="badge badge-light">{{ quantity }}</span>
            </button>
        </div>
        <div class="col p-1">
            <button type="button" class="btn btn-danger btn-block" v-on:click="loseShip">
                {{ ship.name }}
            </button>
        </div>
  </div>
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