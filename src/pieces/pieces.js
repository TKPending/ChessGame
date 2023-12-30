import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/findLocation.js";

const generateUniqueId = (() => {
    let counter = 0;
    return () => ++counter;
})();

export class Piece {
    constructor(name, team, startingPosition) {
        this.id = generateUniqueId()
        this.name = name;
        this.team = team;
        this.startingPosition = startingPosition;
        this._currentPosition = startingPosition.slice(); 
        this.validMoves = [];
        this.capturedState = false;
        this._lastPosition = [];
        this.direction = team.toLowerCase() === "white" ? -1 : 1;
        this._hasMoved = false;
        this._defendingPiece = [];
    }

    // Return piece name
    get getPieceName() {
        return this.name;
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

    // Still in initial starting position
    get hasMoved() {
        return this._hasMoved;
    }

    // Pieces being defended
    get defendingPieces() {
        return this._defendingPiece;
    }

    // Set move status
    set hasMoved(moved) {
        this._hasMoved = moved;
    }

    // Set starting position (Pawn Switch)
    set transferStartingPosition(originalStartingPosition) {
        this.startingPosition = originalStartingPosition;
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
        this._defendingPiece = [];
    }

    // Check for friendlies
    friendlyTileCheck(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            const tileOccupation = chessBoard[newRow][newCol].spaceOccupation;

            // TODO: Make this fuction global
            if (tileOccupation && tileOccupation.pieceTeam == this.team) {
                if (!this._defendingPiece.some(piece => piece.id === tileOccupation.id)) {
                    this._defendingPiece.push(tileOccupation);
                }
            }

            return tileOccupation && tileOccupation.pieceTeam === this.team;
        }

        // Return false if the position is out of bounds
        return false;
    }

    // Edge Detection - Board check
    isInBounds(row, col) {
        return row >= 0 && row <= 7 && col >= 0 && col <= 7;
    }

    // Prevent jumping over pieces - Friendly or Enemy
    isTileOccupied(row, col, chessBoard) {
        const tile = chessBoard[row][col];

        // False = Taken & True = Empty
        return tile.pieceInWayCheck == true ? true : false;
    }

    // Edge Detection - Initiate Check
    pieceBoundCheck(newRow, newCol) {
        return this.isInBounds(newRow, newCol) ? [newRow, newCol] : null;
    }

    // Edge Detection Logic
    maxMove(legalMoves, rowDelta, colDelta, chessBoard) {
        let newRow = this._currentPosition[0] + rowDelta * this.direction;
        let newCol = this._currentPosition[1] + colDelta * this.direction;
    
        while (this.pieceBoundCheck(newRow, newCol)) {
            const tileCheck = this.isTileOccupied(newRow, newCol, chessBoard);
    
            // Empty tile
            if (tileCheck) {
                legalMoves.push([newRow, newCol]);
                newRow += rowDelta * this.direction;
                newCol += colDelta * this.direction;
            } else {
                // Has piece in tile
                const currentTile = chessBoard[this._currentPosition[0]][this._currentPosition[1]];
                const targetTile = chessBoard[newRow][newCol];
    
                // Enemy Piece
                if (targetTile.ownsTile !== currentTile.ownsTile) {
                    legalMoves.push([newRow, newCol]);
                // Friendly Piece
                } else if (targetTile.ownsTile === currentTile.ownsTile) {
                    const pieceInTile = targetTile.spaceOccupation;
    
                    // Check if the piece is not already in _protectPiece based on position
                    if (!this._defendingPiece.some(piece => piece.id === pieceInTile.id)) {
                        this._defendingPiece.push(pieceInTile);
                    }
                }
                break;
            }
        }
    }

    // Highlight Tiles
    highlightTiles() {
        for (const move of this.validMoves) {
            const chessAlgebraicMove = indexToLocation(move, this.team);
            highlightTile(chessAlgebraicMove);
        }
    }

    // Legal Moves - Highlight Tiles
    filterTiles(legalMoves, piece) {
        const filteredMoves = legalMoves.filter(move => move != null);

        piece.validFutureMoves = filteredMoves;

        return filteredMoves;
    }

    // Piece has been captured
    pieceCaptured() {
        this.capturedState = true;
    }
}