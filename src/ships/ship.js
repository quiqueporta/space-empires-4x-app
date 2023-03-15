class Ship {

    constructor(name = '', shortName = '', cost = 0, maintenance = 0, requiredShipSizeLevel = 0) {
        this._name = name;
        this._shortName = shortName;
        this._cost = cost;
        this._maintenance = maintenance;
        this._requiredShipSizeLevel = requiredShipSizeLevel;

        Object.freeze(this);
    }

    get cost() {
        return this._cost;
    }

    get maintenance() {
        return this._maintenance;
    }

    get name() {
        return this._name;
    }

    get requiredShipSizeLevel() {
        return this._requiredShipSizeLevel;
    }

    get shortName() {
        return this._shortName;
    }

}

export { Ship };
