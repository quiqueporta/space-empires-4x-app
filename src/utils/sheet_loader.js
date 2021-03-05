var _ = require('lodash');

import { Ship } from '../models/ships';
import { TechnologyProgression } from '../models/technologies';

export class SheetLoader {
  constructor(sheet_info) {
    this.sheet_info = sheet_info;
  }

  loadTechs(tech_manifest) {
    return this.sheet_info['techs'].map(function(tech_on_sheet) {
      var tech_info = _.find(tech_manifest, {name: tech_on_sheet['name']});
      return new TechnologyProgression(tech_info, tech_on_sheet);
    });
  }

  loadShips(ship_manifest, tech_manifest) {
    return this.sheet_info['ships'].map(function(ship_on_sheet) {
      var ship_stats = _.find(ship_manifest, {type: ship_on_sheet['type']});
      return new Ship(ship_stats, tech_manifest, ship_on_sheet);
    });
  }
}