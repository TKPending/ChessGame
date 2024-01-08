import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/pieceTileLocation.js";

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

    // Return piece current position
    get getCurrentPosition() {
        return this._currentPosition;
    }

    // Return piece starting position
    get getStartingPosition() {
        return this.startingPosition;
    }

    // Return piece last position
    get getLastPosition() {
        return this._lastPosition
    }

    // Return Piece Team
    get pieceTeam() {
        return this.team;
    }

    // Return Piece Valid Moves
    get getValidMoves() {
        return this.validMoves;
    }

    // Return whether piece has moved from initial position
    get hasMoved() {
        return this._hasMoved;
    }

    // Return the pieces that this. piece is defending 
    get defendingPieces() {
        return this._defendingPiece;
    }

    // Update piece if it has moved
    set hasMoved(moved) {
        this._hasMoved = moved;
    }

    /** 
     * @param {number[]} originalStartingPosition
     */
    // Update starting position when a pawn is promoted
    set transferStartingPosition(originalStartingPosition) {
        this.startingPosition = originalStartingPosition;
    }

    /**
     * @param {[]} legalMoves
     */
    // Update piece legal moves
    set validFutureMoves(legalMoves) {
        if (legalMoves) {
            this.validMoves = legalMoves;
        }
    }

    /**
     * @param {number[]} tileLocation
     */
    // Update piece last location whenever a piece moves
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
    // Update piece current position, after being moved
    set updateCurrentPosition(newPosition) {
        this._currentPosition = newPosition;
        this._defendingPiece = [];
    }

    // Check if (other) piece is already being defended
    isDefendingPieces(tileOccupation) {
        if (!this._defendingPiece.some(piece => piece.id === tileOccupation.id)) {
            // Push piece being defended into defending pieces
            this._defendingPiece.push(tileOccupation);
        }
    }

    // Check that move is within the board
    isInBounds(row, col) {
        return row >= 0 && row <= 7 && col >= 0 && col <= 7;
    }

    // Return whether there is a piece blocking movement
    isTileOccupied(row, col, chessBoard) {
        const tile = chessBoard[row][col];

        // False = Taken & True = Empty
        return tile.pieceInWayCheck == true ? true : false;
    }

    // Return board location or null if location invalid
    pieceBoundCheck(newRow, newCol) {
        return this.isInBounds(newRow, newCol) ? [newRow, newCol] : null;
    }

    // Check if a tile is a owned by friendly or not - Adds defended pieces to defending pieces
    friendlyTileCheck(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            // Gets piece or empty tile
            const tileOccupation = chessBoard[newRow][newCol].spaceOccupation;

            // If piece on tile, check if it's a friendly
            if (tileOccupation && tileOccupation.pieceTeam == this.team) {
                this.isDefendingPieces(tileOccupation)

                // Friendly Tile
                return true;
            }
        }

        // Return false if the position is out of bounds or enemy
        return false;
    }

    // Logic for calculating movements
    moveDirection(rowChange, colChange, chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
    
        const newRow = row + rowChange * this.direction;
        const newCol = col + colChange * this.direction;
    
        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);
    
        return !friendlyTile && validTile ? [newRow, newCol] : undefined;
    }

    // Piece Fundamental Movements
    moveUp(chessBoard) {
        return this.moveDirection(1, 0, chessBoard ? chessBoard : null);
    }

    moveDown(chessBoard) {
        return this.moveDirection(-1, 0, chessBoard ? chessBoard : null);
    }
    
    moveRight(chessBoard) {
        return this.moveDirection(0, 1, chessBoard ? chessBoard : null);
    }
    
    moveLeft(chessBoard) {
        return this.moveDirection(0, -1, chessBoard ? chessBoard : null);
    }

    moveUpRight(chessBoard) {
        return this.moveDirection(-1, 1, chessBoard ? chessBoard : null);
    }
    
    moveUpLeft(chessBoard) {
        return this.moveDirection( -1, -1, chessBoard ? chessBoard : null);
    }
    
    moveDownRight(chessBoard) {
        return this.moveDirection(1, 1, chessBoard ? chessBoard : null);
    }
    
    moveDownLeft(chessBoard) {
        return this.moveDirection(1, -1, chessBoard ? chessBoard : null);
    }

    // Up, Down, Left and Right Max Move
    maxTransversalMoves(chessBoard, legalMoves) {
        this.maxMove(legalMoves, -1, 0, chessBoard); // Up
        this.maxMove(legalMoves, 1, 0, chessBoard); // Down
        this.maxMove(legalMoves, 0, 1, chessBoard); // Right
        this.maxMove(legalMoves, 0, -1, chessBoard); // Left
    }

    maxDiagonalMoves(chessBoard, legalMoves) {
        this.maxMove(legalMoves, -1, 1, chessBoard); // Diagonal Up-Right
        this.maxMove(legalMoves, -1, -1, chessBoard); // Diagonal Up-Left
        this.maxMove(legalMoves, 1, 1, chessBoard); // Diagonal Down-Right
        this.maxMove(legalMoves, 1, -1, chessBoard); // Diagonal Down-Left
    }

    // Generate the maximum legal moves for Queen, Bishop and Rook
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
                    this.isDefendingPieces(pieceInTile);
                }
                break;
            }
        }
    }

    // Highlight Valid Move Tiles
    highlightTiles() {
        for (const move of this.validMoves) {
            const chessAlgebraicMove = indexToLocation(move, this.team);
            highlightTile(chessAlgebraicMove);
        }
    }

    // Filter moves for legal moves
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