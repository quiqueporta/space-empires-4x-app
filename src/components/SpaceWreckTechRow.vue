<template>
  <tr>
    <td>
      <button type="button" class="btn btn-primary btn-block" v-on:click="increaseTechnology">
        {{ title }} <span class="badge badge-light">{{ technology.currentLevel }}</span>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SpaceWreckTechRow',
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function() {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': true})
    }
  }
}
</script>