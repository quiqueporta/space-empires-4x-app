<template>
  <b-row>
    <b-col cols=2>
      {{ technology.title }} <b-badge variant="light">{{ technology.currentLevel }}</b-badge>
    </b-col>
    <b-col cols=2>
      <b-button variant="primary" v-on:click="increaseTechnology">Buy</b-button>
    </b-col>
    <b-col cols=2>
      <b-button v-if="technology.wreck" variant="primary" v-on:click="increaseTechnologySpaceWreck">Space Wreck</b-button>
    </b-col>
    <b-col cols=7>
      <b-list-group horizontal>
        <b-list-group-item 
            v-for="(cost, level) in technology.costs"
            v-bind:key="(cost, level)">
          <strong>{{ level }}</strong> <small>({{cost }})</small>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "TechRow",
  props: ['technology'],
  methods: {
    increaseTechnology: function() {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': false})
    },
    increaseTechnologySpaceWreck: function() {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': true})
    }
  }
}
</script>

<style scoped>
.list-group-item {
  width: 51px important;
  padding-right: 2px;
  padding-left: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: center;
}
.row {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>