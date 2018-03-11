import Vue from 'vue'
import toastr from 'toastr'

import { Scout, ShipYard, Miner, ColonyShip, Decoy, Destroyer, Cruiser, BattleCruiser,
         BattleShip, Dreadnaught, Base } from './ships';
import { ShipSize, Attack, Defense, Tactics, Move, ShipYards, Terraforming, Exploration } from './technologies';
import { CommandFactory, AddColonyPointsCommand, AddMineralPointsCommand, SubstractBidPointsCommand,
     SubstractMaintenancePointsCommand, EndTurnCommand, IncreaseShipSizeCommand,
     IncreaseAttackCommand, IncreaseDefenseCommand, IncreaseTacticsCommand, IncreaseMoveCommand,
     IncreaseShipYardsCommand, IncreaseTerraformingCommand, IncreaseExplorationCommand,
     PurchaseScoutCommand, PurchaseShipYardCommand, PurchaseColonyShipCommand, PurchaseMinerCommand,
     PurchaseDecoyCommand, PurchaseDestroyerCommand, PurchaseCruiserCommand, PurchaseBattleCruiserCommand,
     PurchaseBattleShipCommand, PurchaseDreadnaughtCommand, PurchaseBaseCommand,
     LoseScoutCommand, LoseShipYardCommand, LoseDestroyerCommand, LoseBaseCommand,
     LoseCruiserCommand, LoseBattleCruiserCommand, LoseBattleShipCommand, LoseDreadnaughtCommand,
     LoseColonyShipCommand, LoseMinerCommand, LoseDecoyCommand} from './commands';


var STORAGE_KEY = 'space-empires-4x'

var seen = [];

var replacer = function(key, value) {
  if (value != null && typeof value == "object") {
    if (seen.indexOf(value) >= 0) {
      return;
    }
    seen.push(value);
  }
  return value;
};

var spaceEmpiresStorage = {
  fetch: function () {
    var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return data;
  },
  save: function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, replacer));
  },
  clear: function() {
    localStorage.removeItem(STORAGE_KEY);
  }
}


Vue.component('ship-button', {
    template: '#ship-button',
    props: ['ship', 'quantity', 'cost'],
    methods: {
      purchaseShip: function () {
        this.$emit('purchase-ship', this.ship);
      },
      loseShip: function () {
        this.$emit('lose-ship', this.ship);
      },
    }
});


Vue.component('technology-button', {
    template: '#technology-button',
    props: ['technology', 'title'],
    methods: {
      increaseTechnology: function () {
        this.$emit('increase-technology', this.technology);
      }
    }
});


var vm = new Vue({
  el: '#app',
  data: function() {
    return this.loadData(this);
  },
  methods: {
    initialData: function() {
      return {
        turn: 1,
        commands: [],
        constructionPoints: 0,
        colonyPoints: 0,
        mineralPoints: 0,
        bidPoints: 0,
        shipSize: new ShipSize(),
        attack: new Attack(),
        defense: new Defense(),
        tactics: new Tactics(),
        move: new Move(),
        shipYards: new ShipYards(),
        terraforming: new Terraforming(),
        exploration: new Exploration(),
        ships: {
          scouts: [Scout, Scout, Scout],
          shipYards: [ShipYard, ShipYard, ShipYard, ShipYard],
          colonyShips: [ColonyShip, ColonyShip, ColonyShip],
          miners: [Miner],
          decoys: [],
          destroyers: [],
          cruisers: [],
          battleCruisers: [],
          battleShips: [],
          dreadnaughts: [],
          bases: [],
        }
      }
    },
    loadData: function(production_sheet) {
      var isEmpty = Object.keys(spaceEmpiresStorage.fetch()).length === 0 && spaceEmpiresStorage.fetch().constructor === Object
      if (!isEmpty) {
        var data = spaceEmpiresStorage.fetch();
        var commandFactory = new CommandFactory();
        data.shipSize = Object.assign(new ShipSize(), JSON.parse(data.shipSize));
        data.attack = Object.assign(new Attack(), JSON.parse(data.attack));
        data.defense = Object.assign(new Defense(), JSON.parse(data.defense));
        data.tactics = Object.assign(new Tactics(), JSON.parse(data.tactics));
        data.move = Object.assign(new Move(), JSON.parse(data.move));
        data.shipYards = Object.assign(new ShipYards(), JSON.parse(data.shipYards));
        data.terraforming = Object.assign(new Terraforming(), JSON.parse(data.terraforming));
        data.exploration = Object.assign(new Exploration(), JSON.parse(data.exploration));
        data.ships.scouts = Array(data.ships.scouts).fill(Scout);
        data.ships.miners = Array(data.ships.miners).fill(Miner);
        data.ships.decoys = Array(data.ships.decoys).fill(Decoy);
        data.ships.shipYards = Array(data.ships.shipYards).fill(ShipYard);
        data.ships.colonyShips = Array(data.ships.colonyShips).fill(ColonyShip);
        data.ships.destroyers = Array(data.ships.destroyers).fill(Destroyer);
        data.ships.cruisers = Array(data.ships.cruisers).fill(Cruiser);
        data.ships.battleCruisers = Array(data.ships.battleCruisers).fill(BattleCruiser);
        data.ships.battleShips = Array(data.ships.battleShips).fill(BattleShip);
        data.ships.dreadnaughts = Array(data.ships.dreadnaughts).fill(Dreadnaught);
        data.ships.bases = Array(data.ships.bases).fill(Base);
        data.commands = data.commands.map(function(command) { return commandFactory.create(production_sheet, command.name, command) });
        return data
      }
      return this.initialData();
    },
    saveData: function() {
      var data = {
        turn: this.turn,
        commands: this.commands.map(function(command) { return command.toDict();}),
        constructionPoints: this.constructionPoints,
        colonyPoints: this.colonyPoints,
        mineralPoints: this.mineralPoints,
        bidPoints: this.bidPoints,
        shipSize: JSON.stringify(this.shipSize),
        attack: JSON.stringify(this.attack),
        defense: JSON.stringify(this.defense),
        tactics: JSON.stringify(this.tactics),
        move: JSON.stringify(this.move),
        shipYards: JSON.stringify(this.shipYards),
        terraforming: JSON.stringify(this.terraforming),
        exploration: JSON.stringify(this.exploration),
        ships: {
          scouts: this.ships.scouts.length,
          shipYards: this.ships.shipYards.length,
          colonyShips: this.ships.colonyShips.length,
          miners: this.ships.miners.length,
          decoys: this.ships.decoys.length,
          destroyers: this.ships.destroyers.length,
          cruisers: this.ships.cruisers.length,
          battleCruisers: this.ships.battleCruisers.length,
          battleShips: this.ships.battleShips.length,
          dreadnaughts: this.ships.dreadnaughts.length,
          dreadnaughts: this.ships.dreadnaughts.length,
          bases: this.ships.bases.length,
        }
      }
      spaceEmpiresStorage.save(data);
    },
    clearAll: function() {
      spaceEmpiresStorage.clear();
      this._notifyInfo("Data cleaned. Please reload this page.");
    },
    undo: function() {
      if (this.commands.length <= 0) {
        return;
      }

      var command = this.commands.pop();
      command.undo();
      this.saveData();
    },
    addColonyPoints: function () {
      if (this.colonyPoints <= 0) {
        this._notifyWarning("You cannot add 0 or less CPs.");
        return;
      }

      this._executeCommand(new AddColonyPointsCommand(this, this.colonyPoints));
      this.colonyPoints = 0;
    },
    addMineralPoints: function (points) {
      if (points <= 0) {
        this._notifyWarning("You cannot add 0 or less Mineral points.");
        return;
      }

      this._executeCommand(new AddMineralPointsCommand(this, points));
    },
    addFiveMineralPoints: function () {
      this.addMineralPoints(5);
    },
    addTenMineralPoints: function () {
      this.addMineralPoints(10);
    },
    addFifteenMineralPoints: function () {
      this.addMineralPoints(15);
    },
    substractBidPoints: function () {
      if (this.constructionPoints - this.bidPoints < 0){
        this._notifyWarning("You do not have enough Colony points.");
        return;
      }

      if (this.bidPoints <= 0) {
        this._notifyWarning("You cannot substract 0 or less Bid points.");
        return;
      }

      this._executeCommand(new SubstractBidPointsCommand(this, this.bidPoints));
      this.bidPoints = 0;
    },
    substractMaintenancePoints: function () {
      if (this.constructionPoints - this.maintenance < 0){
        this._notifyWarning("You do not have enough Colony points.");
        return;
      }

      if (this.maintenance <= 0) {
        this._notifyWarning("You cannot substract 0 or less Maintenance points.");
        return;
      }

      this._executeCommand(new SubstractMaintenancePointsCommand(this, this.maintenance));
    },
    endTurn: function() {
      if (this.turn >= 20) {
        this._notifyWarning("This is the last turn. Game Over!");
        return;
      }

      this._executeCommand(new EndTurnCommand(this, this.turn));
    },
    increaseTurn() {
      this.turn += 1;
    },
    decreaseTurn() {
      if (this.turn <= 0) {
        this._notifyWarning("You are on first turn. You cannot decrease.");
        return;
      }
      this.turn -= 1;
    },
    increaseContructionPoints: function (points) {
      this.constructionPoints += points;
    },
    decreaseContructionPoints: function (points) {
      this.constructionPoints -= points;
    },
    increaseShipSize: function() {
      this._increaseTechnology(this.shipSize);
    },
    decreaseShipSize: function() {
      this._decreaseTechnology(this.shipSize);
    },
    increaseAttack: function() {
      this._increaseTechnology(this.attack);
    },
    decreaseAttack: function() {
      this._decreaseTechnology(this.attack);
    },
    increaseDefense: function() {
      this._increaseTechnology(this.defense);
    },
    decreaseDefense: function() {
      this._decreaseTechnology(this.defense);
    },
    increaseTactics: function() {
      this._increaseTechnology(this.tactics);
    },
    decreaseTactics: function() {
      this._decreaseTechnology(this.tactics);
    },
    increaseMove: function() {
      this._increaseTechnology(this.move);
    },
    decreaseMove: function() {
      this._decreaseTechnology(this.move);
    },
    increaseShipYards: function() {
      this._increaseTechnology(this.shipYards);
    },
    decreaseShipYards: function() {
      this._decreaseTechnology(this.shipYards);
    },
    increaseTerraforming: function() {
      this._increaseTechnology(this.terraforming);
    },
    decreaseTerraforming: function() {
      this._decreaseTechnology(this.terraforming);
    },
    increaseExploration: function() {
      this._increaseTechnology(this.exploration);
    },
    decreaseExploration: function() {
      this._decreaseTechnology(this.exploration);
    },
    increaseTechnologyCommand: function(technology) {
      var commands = {
        'ShipSize': new IncreaseShipSizeCommand(this),
        'Attack': new IncreaseAttackCommand(this),
        'Defense': new IncreaseDefenseCommand(this),
        'Tactics': new IncreaseTacticsCommand(this),
        'Move': new IncreaseMoveCommand(this),
        'ShipYards': new IncreaseShipYardsCommand(this),
        'Terraforming': new IncreaseTerraformingCommand(this),
        'Exploration': new IncreaseExplorationCommand(this),
      }

      if (!technology.canIncrease(this.constructionPoints)) {
        this._notifyWarning("You cannot increase it.");
        return;
      }

      this._executeCommand(commands[technology.getName()]);
    },
    purchaseShipCommand: function(shipName) {
      var commands = {
        'Scout': new PurchaseScoutCommand(this),
        'ShipYard': new PurchaseShipYardCommand(this),
        'ColonyShip': new PurchaseColonyShipCommand(this),
        'Miner': new PurchaseMinerCommand(this),
        'Decoy': new PurchaseDecoyCommand(this),
        'Destroyer': new PurchaseDestroyerCommand(this),
        'Cruiser': new PurchaseCruiserCommand(this),
        'BattleCruiser': new PurchaseBattleCruiserCommand(this),
        'BattleShip': new PurchaseBattleShipCommand(this),
        'Dreadnaught': new PurchaseDreadnaughtCommand(this),
        'Base': new PurchaseBaseCommand(this),
      }

      var costs = {
        'Scout': Scout.cost,
        'ShipYard': ShipYard.cost,
        'ColonyShip': ColonyShip.cost,
        'Miner': Miner.cost,
        'Decoy': Decoy.cost,
        'Destroyer': Destroyer.cost,
        'Cruiser': Cruiser.cost,
        'BattleCruiser': BattleCruiser.cost,
        'BattleShip': BattleShip.cost,
        'Dreadnaught': Dreadnaught.cost,
        'Base': Base.cost,
      }

      var ships = {
        'Scout': this.ships.scouts,
        'ShipYard': this.ships.shipYards,
        'ColonyShip': this.ships.colonyShips,
        'Miner': this.ships.miners,
        'Decoy': this.ships.decoys,
        'Destroyer': this.ships.destroyers,
        'Cruiser': this.ships.cruisers,
        'BattleCruiser': this.ships.battleCruisers,
        'BattleShip': this.ships.battleShips,
        'Dreadnaught': this.ships.dreadnaughts,
        'Base': this.ships.bases,
      }

      var maxShips = {
        'Scout': 30,
        'ShipYard': 24,
        'ColonyShip': 15,
        'Miner': 2,
        'Decoy': 2,
        'Destroyer': 24,
        'Cruiser': 24,
        'BattleCruiser': 24,
        'BattleShip': 24,
        'Dreadnaught': 12,
        'Base': 12,
      }

      var minimumShipSizeTechnology = {
        'Scout': 1,
        'ShipYard': 1,
        'ColonyShip': 1,
        'Miner': 1,
        'Decoy': 1,
        'Destroyer': 2,
        'Cruiser': 3,
        'BattleCruiser': 4,
        'BattleShip': 5,
        'Dreadnaught': 6,
        'Base': 2,
      }

      if (this.shipSize.currentLevel < minimumShipSizeTechnology[shipName]) {
        this._notifyWarning("You need " + minimumShipSizeTechnology[shipName] + " Ship Size technology level.");
        return;
      }

      if (ships[shipName].length >= maxShips[shipName]) {
        this._notifyWarning("You cannot build more " + shipName + "s.");
        return;
      }

      if (costs[shipName] > this.constructionPoints) {
        this._notifyWarning("You do not have enough CPs");
        return;
      }

      this._executeCommand(commands[shipName]);
    },
    purchaseScout: function() {
      this.ships.scouts.push(Scout);
      this.decreaseContructionPoints(Scout.cost);
    },
    sellScout: function() {
      this.ships.scouts.pop();
      this.increaseContructionPoints(Scout.cost);
    },
    purchaseShipYard: function() {
      this.ships.shipYards.push(ShipYard);
      this.decreaseContructionPoints(ShipYard.cost);
    },
    sellShipYard: function() {
      this.ships.shipYards.pop();
      this.increaseContructionPoints(ShipYard.cost);
    },
    purchaseColonyShip: function() {
      this.ships.colonyShips.push(ColonyShip);
      this.decreaseContructionPoints(ColonyShip.cost);
    },
    sellColonyShip: function() {
      this.ships.colonyShips.pop();
      this.increaseContructionPoints(ColonyShip.cost);
    },
    purchaseMiner: function() {
      this.ships.miners.push(Miner);
      this.decreaseContructionPoints(Miner.cost);
    },
    sellMiner: function() {
      this.ships.miners.pop();
      this.increaseContructionPoints(Miner.cost);
    },
    purchaseDecoy: function() {
      this.ships.decoys.push(Decoy);
      this.decreaseContructionPoints(Decoy.cost);
    },
    sellDecoy: function() {
      this.ships.decoys.pop();
      this.increaseContructionPoints(Decoy.cost);
    },
    purchaseDestroyer: function() {
      this.ships.destroyers.push(Destroyer);
      this.decreaseContructionPoints(Destroyer.cost);
    },
    sellDestroyer: function() {
      this.ships.destroyers.pop();
      this.increaseContructionPoints(Destroyer.cost);
    },
    purchaseCruiser: function() {
      this.ships.cruisers.push(Cruiser);
      this.decreaseContructionPoints(Cruiser.cost);
    },
    sellCruiser: function() {
      this.ships.cruisers.pop();
      this.increaseContructionPoints(Cruiser.cost);
    },
    purchaseBattleCruiser: function() {
      this.ships.battleCruisers.push(BattleCruiser);
      this.decreaseContructionPoints(BattleCruiser.cost);
    },
    sellBattleCruiser: function() {
      this.ships.battleCruisers.pop();
      this.increaseContructionPoints(BattleCruiser.cost);
    },
    purchaseBattleShip: function() {
      this.ships.battleShips.push(BattleShip);
      this.decreaseContructionPoints(BattleShip.cost);
    },
    sellBattleShip: function() {
      this.ships.battleShips.pop();
      this.increaseContructionPoints(BattleShip.cost);
    },
    purchaseDreadnaught: function() {
      this.ships.dreadnaughts.push(Dreadnaught);
      this.decreaseContructionPoints(Dreadnaught.cost);
    },
    sellDreadnaught: function() {
      this.ships.dreadnaughts.pop();
      this.increaseContructionPoints(Dreadnaught.cost);
    },
    purchaseBase: function() {
      this.ships.bases.push(Base);
      this.decreaseContructionPoints(Base.cost);
    },
    sellBase: function() {
      this.ships.bases.pop();
      this.increaseContructionPoints(Base.cost);
    },
    loseShipCommand: function(shipName) {
      var commands = {
        'ColonyShip': new LoseColonyShipCommand(this),
        'Miner': new LoseMinerCommand(this),
        'Decoy': new LoseDecoyCommand(this),
        'Scout': new LoseScoutCommand(this),
        'ShipYard': new LoseShipYardCommand(this),
        'Destroyer': new LoseDestroyerCommand(this),
        'Cruiser': new LoseCruiserCommand(this),
        'BattleCruiser': new LoseBattleCruiserCommand(this),
        'BattleShip': new LoseBattleShipCommand(this),
        'Dreadnaught': new LoseDreadnaughtCommand(this),
        'Base': new LoseBaseCommand(this),
      }

      var ships = {
        'ColonyShip': this.ships.colonyShips,
        'Miner': this.ships.miners,
        'Decoy': this.ships.decoys,
        'Scout': this.ships.scouts,
        'ShipYard': this.ships.shipYards,
        'Destroyer': this.ships.destroyers,
        'Cruiser': this.ships.cruisers,
        'BattleCruiser': this.ships.battleCruisers,
        'BattleShip': this.ships.battleShips,
        'Dreadnaught': this.ships.dreadnaughts,
        'Base': this.ships.bases,
      }

      if (ships[shipName].length <= 0) {
        this._notifyWarning("You cannot lose more " + shipName + "s.");
        return;
      }

      this._executeCommand(commands[shipName]);
    },
    loseColonyShip: function() {
      this.ships.colonyShips.pop();
    },
    findColonyShip: function() {
      this.ships.colonyShips.push(Scout);
    },
    loseDecoy: function() {
      this.ships.decoys.pop();
    },
    findDecoy: function() {
      this.ships.decoys.push(Scout);
    },
    loseMiner: function() {
      this.ships.miners.pop();
    },
    findMiner: function() {
      this.ships.miners.push(Scout);
    },
    loseScout: function() {
      this.ships.scouts.pop();
    },
    findScout: function() {
      this.ships.scouts.push(Scout);
    },
    loseBase: function() {
      this.ships.bases.pop();
    },
    findBase: function() {
      this.ships.bases.push(Scout);
    },
    loseShipYard: function() {
      this.ships.shipYards.pop();
    },
    findShipYard: function() {
      this.ships.shipYards.push(ShipYard);
    },
    loseDestroyer: function() {
      this.ships.destroyers.pop();
    },
    findDestroyer: function() {
      this.ships.destroyers.push(Destroyer);
    },
    loseCruiser: function() {
      this.ships.cruisers.pop();
    },
    findCruiser: function() {
      this.ships.cruisers.push(Cruiser);
    },
    loseBattleCruiser: function() {
      this.ships.battleCruisers.pop();
    },
    findBattleCruiser: function() {
      this.ships.battleCruisers.push(BattleCruiser);
    },
    loseBattleShip: function() {
      this.ships.battleShips.pop();
    },
    findBattleShip: function() {
      this.ships.battleShips.push(BattleShip);
    },
    loseDreadnaught: function() {
      this.ships.dreadnaughts.pop();
    },
    findDreadnaught: function() {
      this.ships.dreadnaughts.push(Dreadnaught);
    },
    _increaseTechnology: function(technology) {
      technology.increaseLevel();
      this.decreaseContructionPoints(technology.costCurrentLevel());
    },
    _decreaseTechnology: function(technology) {
      technology.decreaseLevel();
      this.increaseContructionPoints(technology.costNextLevel());
    },
    _executeCommand: function(command) {
      command.do();
      this.commands.push(command);
      this.saveData();
      this._notifySuccess(command.toString());
    },
    _notifyOptions: function() {
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "50",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    },
    _notifySuccess: function(message) {
      this._notifyOptions();
      toastr.success(message);
    },
    _notifyWarning: function(message) {
      this._notifyOptions();
      toastr.warning(message);
    },
    _notifyInfo: function(message) {
      this._notifyOptions();
      toastr.info(message);
    }
  },
  computed: {
    reverseCommands() {
        return this.commands.slice().reverse();
    },
    numberColonyShips() {
      return this.ships.colonyShips.length;
    },
    numberScouts() {
      return this.ships.scouts.length;
    },
    numberMiners() {
      return this.ships.miners.length;
    },
    numberShipYards() {
      return this.ships.shipYards.length;
    },
    numberDecoys() {
      return this.ships.decoys.length;
    },
    numberDestroyers() {
      return this.ships.destroyers.length;
    },
    numberCruisers() {
      return this.ships.cruisers.length;
    },
    numberBattleCruisers() {
      return this.ships.battleCruisers.length;
    },
    numberBattleShips() {
      return this.ships.battleShips.length;
    },
    numberDreadnaughts() {
      return this.ships.dreadnaughts.length;
    },
    numberBases() {
      return this.ships.bases.length;
    },
    maintenance() {
      var result = 0;
      for (var ship_type in this.ships) {
        for (var ship in this.ships[ship_type]) {
          result += this.ships[ship_type][ship].hullSize;
        }
      }
      return result;
    }
  }
})
