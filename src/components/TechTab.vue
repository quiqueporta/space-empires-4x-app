<template>
  <b-container fluid>
    <b-row>
      <b-col><strong>Technology</strong></b-col>
      <b-col><strong>New Tech Level (CP Cost)</strong></b-col>
    </b-row>
    <TechRow
      v-for="technology in normalTechs"
      v-bind:key="technology.title"
      v-bind:technology="technology"
      v-on:increase-technology="increaseTechnologyCommand" />
    <div class="w-100"><strong>Advanced</strong></div>
    <TechRow
      v-for="technology in advancedTechs"
      v-bind:key="technology.title"
      v-bind:technology="technology"
      v-on:increase-technology="increaseTechnologyCommand" />
    <div class="w-100"><strong>Space Wreck Technology</strong></div>
    <SpaceWreckTechRow
      v-for="technology in wreckTechs"
      v-bind:key="wreckKey(technology)"
      v-bind:technology="technology"
      v-on:increase-technology="increaseTechnologyCommand" />
  </b-container>
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
    wreckKey: function(tech) {
      return tech.title + " Wreck";
    }
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