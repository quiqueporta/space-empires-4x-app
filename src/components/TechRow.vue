<template>
  <tr>
    <td>
      <button type="button" class="btn btn-primary btn-block" v-on:click="increaseTechnology">
        {{ title }} <span class="badge badge-light">{{ technology.currentLevel }}</span>
      </button>
    </td>
    <td>
      <ul class="list-inline">
        <li class="list-inline-item" v-for="(cost, level) in technology.costs" v-bind:key="(cost, level)">
          <strong>{{ level }}</strong> <small>({{ cost }})</small>
         </li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TechRow",
  props: ['technology', 'title'],
  methods: {
    increaseTechnology: function() {
      this.$emit('increase-technology', {'technology': this.technology, 'wreck': false})
    }
  }
}
</script>