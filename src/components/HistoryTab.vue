<template>
  <div class="container-fluid">
    <div class="row p-1">
        <div class="col p-1 mt-5">
            <button type="button" class="btn btn-warning btn-block" v-on:click="undo">Undo</button>
        </div>
    </div>
    <div class="row p-1">
        <div class="col p-1">
            <ul>
                <li v-for="command in reverseCommands"
                    v-bind:key="command.key()"
                    >
                    {{ command.toString() }}
                </li>
            </ul>
        </div>
    </div>
  </div>
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