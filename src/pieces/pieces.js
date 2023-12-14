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

    /**
     * @param {number[]} newPosition
     */
    set setCurrentPosition(newPosition) {
        this._currentPosition = newPosition;
    }

    // Return [x,x] co-ord of new position - Checks validity before return valid result
    createNewPosition(newPosition) {
        if (this.validatePosition(newPosition)) {
            console.log(`${this.team} ${this.name} moved to ${newPosition}`);
            this._currentPosition = newPosition.slice();
            return this._currentPosition;
        } else {
            console.log("Invalid position. This will move piece off board");
            return null;
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