class Ship {

    constructor(name = '', shortName = '', cost = 0, hullSize = 0, maintenance = 0) {
        this._name = name;
        this._shortName = shortName;
        this._cost = cost;
        this._hullSize = hullSize;
        this._maintenance = maintenance;

        Object.freeze(this);
    }

    get cost() {
        return this._cost;
    }

    get hullSize() {
        return this._hullSize;
    }

    get maintenance() {
        return this._maintenance;
    }

    get name() {
        return this._name;
    }

    get shortName() {
        return this._shortName;
    }

}

export { Ship };
