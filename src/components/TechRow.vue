<template>
  <b-row>
    <b-col cols=5>
      <b-button block variant="primary" v-on:click="increaseTechnology">
        {{ technology.title }} <b-badge variant="light">{{ technology.currentLevel }}</b-badge>
      </b-button>
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