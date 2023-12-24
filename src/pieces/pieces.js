export class Piece {
    constructor(name, team, startingPosition) {
        this.name = name;
        this.team = team;
        this.startingPosition = startingPosition;
        this._currentPosition = startingPosition.slice(); 
        this.validMoves = [];
        this.capturedState = false;
        this._lastPosition = [];
        this.direction = team.toLowerCase() === "white" ? -1 : 1;
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

    // Return Team
    get pieceTeam() {
        return this.team;
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
    set updateCurrentPosition(newPosition) {
        this._currentPosition = newPosition;
    }

    // Check whether tile is friendly or enemy
    checkCapturePossible(newRow, newCol, chessBoard) {
        const tileCheck = chessBoard[newRow][newCol].spaceOccupation;

        if (tileCheck) {
            return tileCheck.pieceTeam != this.team ? true : false;
        }
    }

    // Edge Detection - Board check
    isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    // Prevent jumping over pieces - Friendly or Enemy
    isTileOccupied(row, col, chessBoard) {
        const tile = chessBoard[row][col];

        // False = Taken & True = Empty
        return tile.pieceInWayCheck == true ? true : false;
    }

    // Edge Detection - Initiate Check
    pieceBoundCheck(newRow, newCol) {
        if (this.isInBounds(newRow, newCol)) {
            return [newRow, newCol]
        } else {
            return null;
        }
    }

    // Edge Detection Logic
    maxMove(legalMoves, rowDelta, colDelta, chessBoard) {
        let newRow = this._currentPosition[0] + rowDelta * this.direction;
        let newCol = this._currentPosition[1] + colDelta * this.direction;
    
        while (this.pieceBoundCheck(newRow, newCol)) {
            const tileCheck = this.isTileOccupied(newRow, newCol, chessBoard);

            if (tileCheck) {
                legalMoves.push([newRow, newCol]);
                newRow += rowDelta * this.direction;
                newCol += colDelta * this.direction;
            } else {
                if (chessBoard[newRow][newCol].ownsTile !== chessBoard[this._currentPosition[0]][this._currentPosition[1]].ownsTile) {
                    legalMoves.push([newRow, newCol])
                }
                break;
            }
        }
    }

    // Piece has been captured
    pieceCaptured() {
        this.capturedState = true;
    }
}