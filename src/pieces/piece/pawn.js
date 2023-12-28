import { Piece } from "../pieces.js";
import { highlightTile } from "../../util/clickedPiece.js";
import { indexToLocationPawn } from "../../util/findLocation.js";

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
    }

    // Check if piece is infront of pawn
    moveForwardLimit(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            const tileCheck = chessBoard[newRow][newCol].spaceOccupation;
       
            return tileCheck ? false : true;
        }
    }

    // Standard pawn move
    moveForwardOnce(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        const invalidCheck = this.moveForwardLimit(newRow, newCol, chessBoard);

        return invalidCheck ? [newRow, newCol] : null;
    }

    // Beginning move
    moveForwardTwice(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 2 * this.direction;
        const newCol = col;

        if (this.startingPosition[0] != this._currentPosition[0] || this.startingPosition[1] != this._currentPosition[1]) {
            return null;
        }

        if (!this.moveForwardLimit(row + 1 * this.direction, newCol, chessBoard)) {
            return null;
        }

        const invalidCheck = this.moveForwardLimit(newRow, newCol, chessBoard);

        return invalidCheck ? [newRow, newCol] : null;
    }

    // Check whether tile is friendly or enemy
    checkCapturePossible(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            const tileCheck = chessBoard[newRow][newCol].spaceOccupation;

            if (tileCheck) {
                return tileCheck.pieceTeam != this.team ? true : false;
            }
        }
    }

    // Capture to diagonal right
    captureRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col + 1;

        const canCapture = this.checkCapturePossible(newRow, newCol, chessBoard);
        return canCapture ? [newRow, newCol] : null;
    }

    // Capture to diagonal left
    captureLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col - 1;

        const canCapture = this.checkCapturePossible(newRow, newCol, chessBoard);
        return canCapture ? [newRow, newCol] : null;
    }

    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.moveForwardOnce(chessBoard),
            this.moveForwardTwice(chessBoard),
            this.captureRight(chessBoard),
            this.captureLeft(chessBoard),
        ];

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);
        console.log(filteredMoves);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {
            const chessMove = indexToLocationPawn(move, this.team);
            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const pawnTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-pawn.png" : "../assets/black-pawn.png";
        return pawnTeamIcon;
    }
}
