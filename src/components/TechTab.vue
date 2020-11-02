<template>
  <div class="container-fluid">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Technology</th>
                <th scope="col">New Technology Level (CP Cost)</th>
            </tr>
        </thead>
        <tbody>
            <tr is="TechRow" 
                v-for="technology in normalTechs"
                v-bind:key="technology.name"
                v-bind:technology="technology"
                v-bind:title="technology.title"
                v-on:increase-technology="increaseTechnologyCommand"></tr>
            <tr><td><strong>Advanced</strong></td></tr>
            <tr is="TechRow"
                v-for="technology in advancedTechs"
                v-bind:key="technology.name"
                v-bind:technology="technology"
                v-bind:title="technology.title"
                v-on:increase-technology="increaseTechnologyCommand"></tr>
        </tbody>
    </table>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Space Wreck Technology</th>
            </tr>
        </thead>
        <tbody>
            <tr is="SpaceWreckTechRow"
                v-for="technology in wreckTechs"
                v-bind:key="technology.name"
                v-bind:technology="technology"
                v-bind:title="technology.title"
                v-on:increase-technology="increaseTechnologyCommand"></tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { IncreaseTechCommand } from '../models/commands';
import TechRow from "./TechRow.vue";
import SpaceWreckTechRow from "./SpaceWreckTechRow.vue";


export default {
  name: "TechTab",
  components: { TechRow, SpaceWreckTechRow },
  props: [ 'techs', 'psheet' ],
  methods: {
    increaseTechnologyCommand: function(tech_info) {
      var technology = tech_info['technology'];
      var wreck = tech_info['wreck'];

      if (!wreck && !this.psheet.hasSubtractedMaintenancePoints()) {
        this.psheet._notifyWarning('You cannot purchase technology until after subtracting maintenance.');
        return;
      }

      if (technology.onMaxLevel()) {
        this.psheet._notifyWarning(technology.title + ' is already at maximum.');
        return;
      } else if (!wreck && !technology.canIncrease(this.psheet.constructionPoints)) {
        this.psheet._notifyWarning('You do not have enough CP to increase ' + technology.title + '.');
        return;
      }

     this.psheet._executeCommand(new IncreaseTechCommand(this.psheet, technology, wreck));
    },
  },
  computed: {
    normalTechs: function() {
      return this.techs.filter(tech => !tech.advanced);
    },
    advancedTechs: function() {
      return this.techs.filter(tech => tech.advanced);
    },
    wreckTechs: function() {
      return this.techs.filter(tech => tech.wreck);
    }
  }
}
</script>