class InsufficientColonyPoints extends Error {
    constructor(message) {
        super(message);
        this.name = 'InsufficientColonyPoints';
    }
}

class NoBidMade extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoBidMade';
    }
}

class InsufficientShipSizeLevel extends Error {
    constructor(message) {
        super(message);
        this.name = 'InsufficientShipSizeLevel';
    }
}