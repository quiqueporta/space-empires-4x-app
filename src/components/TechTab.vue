<template>
  <b-container fluid class="tech-tab">
    <b-table :items="allTechs" :fields="fields" thead-class="d-none" tbody-tr-class="tech-row">
      <template #cell(tech)="data">
        <div class="tech-name text-right">
          <b-badge v-if="data.item.advanced" variant="danger">A</b-badge>
          {{ techTitle(data.item) }} <b-badge variant="success">{{ data.item.currentLevel }}</b-badge>
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
              v-for="(cost, level) in techCosts(data.item)"
              v-bind:variant="techVariant(data.item, level)"
              v-bind:key="(cost, level)">
            <strong>{{ level }}</strong> <small>({{ cost }})</small>
          </b-list-group-item>
        </b-list-group>
      </template>
    </b-table>
    <b-badge variant="danger">A</b-badge> indicates an Advanced Technology.
  </b-container>
</template>

<script>
import { IncreaseTechCommand } from '../models/commands';

export default {
  name: "TechTab",
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

     this.psheet._executeCommand(new IncreaseTechCommand(this.psheet, technology, technology.currentLevel+1, wreck));
    },
    techVariant: function(tech, level) {
      if (tech.currentLevel >= level) {
        return 'success';
      } else if (tech.currentLevel == level-1) {
        return '';
      } else {
        return 'dark';
      }
    },
    techCosts: function(tech) {
      if (screen.width >= 780) {
        return tech.costs;
      } else {
        var retObj = {};
        if (!tech.onMaxLevel()) {
          retObj[tech.currentLevel+1] = tech.costNextLevel();
        }
        return retObj;
      }
    },
    techTitle: function(tech) {
      if (screen.width <= 400) {
        return tech.short;
      } else {
        return tech.title;
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
      return this.techs.filter(tech => !tech.advanced);
    },
    advancedTechs: function() {
      return this.techs.filter(tech => tech.advanced);
    }
  }
}
</script>

<style scoped>
.tech-tab >>> .tech-row td {
  vertical-align: middle;
}

.list-group-item {
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: center;
}

.tech-tab >>> .cost-col {
  min-width: 317px !important;
}

@media only screen and (max-width: 400px) {
  .tech-tab >>> .table td {
    padding: 0.25rem;
  }
  .tech-tab >>> .cost-col {
    min-width: 60px !important;
  }
}

</style>