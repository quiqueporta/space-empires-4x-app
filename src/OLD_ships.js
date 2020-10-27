export class Scout {
	static get type() {
		return "Scout";
	}
	static get name() {
		return "Scout";
	}
	static get short_name() {
		return "SC";
	}
	static get cost() {
		return 6;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}

export class ShipYard {
	static get type() {
		return "ShipYard";
	}
	static get name() {
		return "ShipYard";
	}
	static get short_name() {
		return "SY";
	}
	static get cost() {
		return 6;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}

export class Miner {
	static get type() {
		return "Miner";
	}
	static get name() {
		return "Mining Ship";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 5;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}

export class ColonyShip {
	static get type() {
		return "ColonyShip";
	}
	static get name() {
		return "Colony Ship";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 8;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Decoy {
	static get type() {
		return "Decoy";
	}
	static get name() {
		return "Decoy";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 1;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Destroyer {
	static get type() {
		return "Destroyer";
	}
	static get name() {
		return "Destroyer";
	}
	static get short_name() {
		return "DD";
	}
	static get cost() {
		return 9;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 2;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Cruiser {
	static get type() {
		return "Cruiser";
	}
	static get name() {
		return "Cruiser";
	}
	static get short_name() {
		return "CA";
	}
	static get cost() {
		return 12;
	}
	static get hullSize() {
		return 2;
	}
	static get requiredShipSizeTechnology() {
		return 3;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class BattleCruiser {
	static get type() {
		return "BattleCruiser";
	}
	static get name() {
		return "BattleCruiser";
	}
	static get short_name() {
		return "BC";
	}
	static get cost() {
		return 15;
	}
	static get hullSize() {
		return 2;
	}
	static get requiredShipSizeTechnology() {
		return 4;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class BattleShip {
	static get type() {
		return "BattleShip";
	}
	static get name() {
		return "BattleShip";
	}
	static get short_name() {
		return "BB";
	}
	static get cost() {
		return 20;
	}
	static get hullSize() {
		return 3;
	}
	static get requiredShipSizeTechnology() {
		return 5;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Dreadnaught {
	static get type() {
		return "Dreadnaught";
	}
	static get name() {
		return "Dreadnaught";
	}
	static get short_name() {
		return "DN";
	}
	static get cost() {
		return 24;
	}
	static get hullSize() {
		return 3;
	}
	static get requiredShipSizeTechnology() {
		return 6;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Base {
	static get type() {
		return "Base";
	}
	static get name() {
		return "Base";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 12;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 2;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Mine {
	static get type() {
		return "Mine";
	}
	static get name() {
		return "Mine";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 5;
	}
	static get hullSize() {
		return 0;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 1;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class MineSweeperShip {
	static get type() {
		return "MineSweeperShip";
	}
	static get name() {
		return "Mine Sweeper";
	}
	static get short_name() {
		return "SW";
	}
	static get cost() {
		return 6;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 1;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class MSPipeline {
	static get type() {
		return "MSPipeline";
	}
	static get name() {
		return "MS Pipeline";
	}
	static get short_name() {
		return "";
	}
	static get cost() {
		return 3;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Raider {
	static get type() {
		return "Raider";
	}
	static get name() {
		return "Raider";
	}
	static get short_name() {
		return "R";
	}
	static get cost() {
		return 12;
	}
	static get hullSize() {
		return 2;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 0;
	}
	static get requiredCloakingTechnology() {
		return 1;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class Carrier {
	static get type() {
		return "Carrier";
	}
	static get name() {
		return "Carrier";
	}
	static get short_name() {
		return "CV";
	}
	static get cost() {
		return 12;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 1;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class FighterOne {
	static get type() {
		return "FighterOne";
	}
	static get name() {
		return "Fighter 1";
	}
	static get short_name() {
		return "F";
	}
	static get cost() {
		return 5;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 1;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class FighterTwo {
	static get type() {
		return "FighterTwo";
	}
	static get name() {
		return "Fighter 2";
	}
	static get short_name() {
		return "F";
	}
	static get cost() {
		return 5;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 2;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}


export class FighterThree {
	static get type() {
		return "FighterThree";
	}
	static get name() {
		return "Fighter 3";
	}
	static get short_name() {
		return "F";
	}
	static get cost() {
		return 5;
	}
	static get hullSize() {
		return 1;
	}
	static get requiredShipSizeTechnology() {
		return 1;
	}
	static get requiredMinesTechnology() {
		return 0;
	}
	static get requiredMineSweeperTechnology() {
		return 0;
	}
	static get requiredFightersTechnology() {
		return 3;
	}
	static get requiredCloakingTechnology() {
		return 0;
	}
	static get maxQuantity() {
		return 50;
	}
}
