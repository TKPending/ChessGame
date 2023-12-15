export class Piece {
    constructor(name, team, startingPosition) {
        this.name = name;
        this.team = team;
        this.startingPosition = startingPosition;
        this._currentPosition = startingPosition.slice(); 
        this.validMoves = [];
        this.capturedState = false;
        this._lastPosition = [];
    }

    // Return current position
    get getCurrentPosition() {
        return this._currentPosition;
    }

    // Return starting position
    get getStartingPosition() {
        return this.startingPosition;
    }

    // Return last position
    get getLastPosition() {
        return this._lastPosition
    }

    // Get Valid Moves
    get getValidMoves() {
        return this.validMoves;
    }

    /**
     * @param {any[]} legalMoves
     */
    set validFutureMoves(legalMoves) {
        if (legalMoves) {
            this.validMoves = legalMoves;
        }
    }

    /**
     * @param {any[]} tileLocation
     */
    set updateLastPosition(tileLocation) {
        if (tileLocation) {
            this._lastPosition = tileLocation;
        } else {
            console.log("ERROR: Can't find last position. DEFAULTED to STARTING POSITION")
            this._lastPosition = this.startingPosition;
        }
    }

    /**
     * @param {number[]} newPosition
     */
    set setCurrentPosition(newPosition) {
        this._currentPosition = newPosition;
    }

    createNewPosition(newPosition) {
        if (this.isInBounds(newPosition)) {
            this._currentPosition = newPosition;
            return this._currentPosition;
        } else {
            console.log("Invalid position. This will move piece off board");
            return null;
        }
    }

    isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    pieceBoundCheck(newRow, newCol) {
        if (this.isInBounds(newRow, newCol)) {
            return [newRow, newCol]
        } else {
            return null;
        }
    }

    maxMove(legalMoves, rowDelta, colDelta) {
        let newRow = this._currentPosition[0] + rowDelta * this.direction;
        let newCol = this._currentPosition[1] + colDelta * this.direction;
    
        while (this.pieceBoundCheck(newRow, newCol)) {
            legalMoves.push([newRow, newCol]);
            newRow += rowDelta * this.direction;
            newCol += colDelta * this.direction;
        }
    }

    // Piece has been captured
    pieceCaptured() {
        this.capturedState = true;
    }
}