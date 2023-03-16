class Command {
    constructor(receiver) {
        this.receiver = receiver;
    }

    execute() {
        throw new Error('execute method is not implemented');
    }

    undo() {
        throw new Error('undo method is not implemented');
    }

    toString() {
        throw new Error('toString method is not implemented');
    }
}


export default Command;