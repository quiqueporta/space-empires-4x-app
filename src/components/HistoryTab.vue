<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-button block variant="warning" v-on:click="undo">Undo</b-button>
      </b-col>
    </b-row>
    <b-row
        v-for="command in reverseCommands"
        v-bind:key="command.key()">
      <b-col>{{ command.toString() }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "HistoryTab",
  props: [ 'psheet' ],
  methods: {
    undo: function() {
      if (this.psheet.commands.length <= 0) {
        return;
      }

      var command = this.psheet.commands.pop();
      command.undo();
      this.psheet.saveData();
    },
  },
  computed: {
    reverseCommands() {
      if (this.psheet.commands === undefined) {
        this.psheet.commands = [];
      }
      return this.psheet.commands.slice().reverse();
    }
  }
}
</script>