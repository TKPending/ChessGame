class Piece {
    constructor(name, team, startingPosition) {
        this.name = name;
        this.team = team;
        this.startingPosition = startingPosition;
        this._currentPosition = [];
        this.potentialFuturePositions = [];
        this.capturedState = false;
    }

    // Return current position
    get currentPosition() {
        return this._currentPosition;
    }

    // Set current position with validation
    set currentPosition(newPosition) {
        if (this.validatePosition(newPosition)) {
            console.log(`${this.team} ${this.name} moved to ${newPosition}`);
            this._currentPosition = newPosition;
        } else {
            console.log("Invalid position");
        }
    }

    // Check if position exists
    validatePosition(newPosition) {
        const [row, col] = newPosition;

        const validRow = row >= 0 && row < 8;
        const validCol = col >= 0 && col < 8;

        return validRow && validCol;
    }

    // Piece has been captured
    pieceCaptured() {
        this.capturedState = true;
    }
}