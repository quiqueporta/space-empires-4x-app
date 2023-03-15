class Technology {

    constructor(name = '', costs = {}, starLevel = 0, minLevel = 0, maxLevel = 0) {
        this._name = name;
        this._costs = costs;
        this._currentLevel = starLevel;
        this._minLevel = minLevel;
        this._maxLevel = maxLevel;
    }

    get currentCost() {
        return this._costs[this._currentLevel];
    }

    get isAtFirstLevel() {
        return this._currentLevel === this._minLevel;
    }

    get isAtLastLevel() {
        return this._currentLevel === this._maxLevel;
    }

    get currentLevel() {
        return this._currentLevel;
    }

    get name() {
        return this._name;
    }

    get nextCost() {
        if (this._currentLevel === this._maxLevel) {
            return 0;
        }
        return this._costs[this._currentLevel + 1];
    }

    increaseLevel() {
        if (this._currentLevel >= this._maxLevel) {
            return;
        }
        this._currentLevel++;
    }

    decreaseLevel() {
        if (this._currentLevel <= this._minLevel) {
            return;
        }
        this._currentLevel--;
    }

}

export { Technology };
