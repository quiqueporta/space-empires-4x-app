<template>
  <b-row>
    <b-col cols=5>
      <b-button variant="primary" v-on:click="increaseTechnology">
        {{ technology.title }} <b-badge variant="light">{{ technology.currentLevel }}</b-badge>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SpaceWreckTechRow',
  props: ['technology' ],
  methods: {
    increaseTechnology: function() {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': true})
    }
  }
}
</script>

<style scoped>
.row {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>