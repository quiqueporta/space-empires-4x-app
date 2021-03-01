var _ = require('lodash');

import { Ship } from '../models/ships';

export class SheetLoader {
  constructor(sheet_info) {
    this.sheet_info = sheet_info;
  }

  loadShips(ship_manifest, tech_manifest) {
    return this.sheet_info['ships'].map(function(ship_on_sheet) {
      var ship_stats = _.find(ship_manifest, {type: ship_on_sheet['type']});
      return new Ship(ship_stats, tech_manifest, ship_on_sheet);
    });
  }
}