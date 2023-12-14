export class Piece {
    constructor(name, team, startingPosition) {
        this.name = name;
        this.team = team;
        this.startingPosition = startingPosition;
        this._currentPosition = startingPosition.slice(); 
        this.potentialFuturePositions = [];
        this.capturedState = false;
    }

    // Return current position
    get getCurrentPosition() {
        return this._currentPosition;
    }

    // Return starting position
    get getStartingPosition() {
        return this.startingPosition;
    }

    // Set current position with validation
    set setCurrentPosition(newPosition) {
        if (this.validatePosition(newPosition)) {
            console.log(`${this.team} ${this.name} moved to ${newPosition}`);
            this._currentPosition = newPosition.slice(); 
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