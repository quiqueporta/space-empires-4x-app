export class Ship {
	constructor(ship_data) {
		this.type = ship_data['type']
		this.name = ship_data['name']
		this.cost = ship_data['cp']
		this.hullSize = ship_data['hull']
		this.shipSize = ship_data['size']
		this._maintenance = true;
		this._prereq = []
		this._maxCount = 50
		this.currentCount = 0;

		if ('maintenance' in ship_data) {
			this.maintenance = ship_data['maintenance'];
		}
		if ('prereq' in ship_data) {
			prs = ship_data['prereq']
			for (var i = 0; i < prs.length; i++) {
				var pr = {'tech': prs[i]['name'], 'level': prs[i]['level']};
				this._prereq.push(pr);
			}
		}
	}

	increaseCount() {
		if (this.currentCount >= this._maxCount) {
			return;
		}

		this.currentCount += 1;
	}

	decreaseCount() {
		if (this.currentCount <= 0) {
			return;
		}

		this.currentCount -= 1;
	}

	canPurchase(constructionPoints) {
		if (this.currentCount >= this._maxCount) {
			return false;
		}

		return (this.cost <= constructionPoints);
	}

	totalMaintenance() {
		if (this._maintenance === false) {
			return 0;
		} else {
			return this.currentCount * this.hullSize;
		}
	}

	requirementsMet(techs) {
		return true;
	}
}