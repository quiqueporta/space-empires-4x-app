<template>
  <b-container fluid>
    <b-table :items="allTechs" :fields="fields" thead-class="d-none" tbody-tr-class="tech-row">
      <template #cell(tech)="data">
        <div class="text-right">
          <b-badge v-if="data.item.advanced" variant="danger">Adv.</b-badge>
          {{ data.item.title }} <b-badge variant="success">{{ data.item.currentLevel }}</b-badge>
        </div>
      </template>

      <template #cell(buy)="data">
        <b-button variant="primary" size="sm" v-on:click="increaseTechnology(data.item, false)">Buy</b-button>
      </template>

      <template #cell(wreck)="data">
        <b-button v-if="data.item.wreck" variant="primary" size="sm" v-on:click="increaseTechnology(data.item, true)">Wreck</b-button>
      </template>

      <template #cell(costs)="data">
        <b-list-group horizontal>
          <b-list-group-item 
              v-for="(cost, level) in data.item.costs"
              v-bind:variant="techVariant(data.item, level)"
              v-bind:key="(cost, level)">
            <strong>{{ level }}</strong> <small>({{ cost }})</small>
          </b-list-group-item>
        </b-list-group>
      </template>
    </b-table>
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
    increaseTechnology: function(technology, wreck) {
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
    techVariant: function(tech, level) {
      if (tech.currentLevel >= level) {
        return 'success';
      } else if (tech.currentLevel == level-1) {
        return '';
      } else {
        return 'dark';
      }
    }
  },
  computed: {
    fields: function () {
      return ['tech', 'buy', 'wreck', { key: 'costs', tdClass: 'cost-col'}];
    },
    allTechs: function() {
      return this.normalTechs.concat(this.advancedTechs);      
    },
    normalTechs: function() {
      console.log('Normal Techs');
      console.log(this.techs.filter(tech => !tech.advanced));
      return this.techs.filter(tech => !tech.advanced);
    },
    advancedTechs: function() {
      return this.techs.filter(tech => tech.advanced);
    }
  }
}
</script>

<style scoped>
.tech-row {
  vertical-align: middle;
}
.list-group-item {
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: center;
}
.cost-col {
  min-width: 317px !important;
}
</style>