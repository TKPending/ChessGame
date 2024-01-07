import { Piece } from "../pieces.js";
import { highlightTile } from "../../util/clickedPiece.js";
import { indexToLocation } from "../../util/findLocation.js";

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
    }

    moveOnce() {

    }

    // Standard pawn move
    moveForwardOnce(chessBoard) {
        return this.moveUp(chessBoard);
    }

    moveForwardTwice(chessBoard) {
        // Check if piece has moved
        if (!this.hasMoved) {
            // Create first move and second move
            const doubleMove = this.moveDirection(2, 0, chessBoard);
            const oneMove = this.moveDirection(1, 0, chessBoard);
    
            // Check validitiy
            if (oneMove && doubleMove) {
                const oneMoveCheck = chessBoard[oneMove[0]][oneMove[1]].spaceOccupation;
    
                // Check if any piece is blocking way
                if (oneMoveCheck && oneMoveCheck.pieceTeam && oneMoveCheck.pieceTeam !== this.pieceTeam) {
                    // Blocked by enemy
                    return oneMove;
                } else {
                    // Blocked by nothing
                    return doubleMove;
                }
            }
        }
    
        // Piece has moved or friendly in way
        return null;
    }
    

    // Check whether tile is friendly or enemy
    checkCapturePossible(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            const tileCheck = chessBoard[newRow][newCol].spaceOccupation;

            if (tileCheck) {
                this.isDefendingPieces(tileCheck);
                return tileCheck.pieceTeam != this.team ? true : false;
            }
        }
    }

    // Helper method for capturing to a diagonal direction
    captureDiagonal(chessBoard, colDelta) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col + colDelta;

        const canCapture = this.checkCapturePossible(newRow, newCol, chessBoard);
        return canCapture ? [newRow, newCol] : null;
    }

    // Capture to diagonal right
    captureRight(chessBoard) {
        return this.captureDiagonal(chessBoard, 1);
    }

    // Capture to diagonal left
    captureLeft(chessBoard) {
        return this.captureDiagonal(chessBoard, -1);
    }

    highlightTiles() {
        // Highlight the valid moves on the UI
        for (const move of this.validMoves) {
            const chessMove = indexToLocation(move, this.team);
            highlightTile(chessMove);
        }
    }

    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.moveForwardOnce(chessBoard),
            this.moveForwardTwice(chessBoard),
            this.captureRight(chessBoard),
            this.captureLeft(chessBoard),
        ];

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "../assets/white-pawn.png" : "../assets/black-pawn.png";
        
    }
}
