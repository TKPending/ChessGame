import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocationPawn } from "../util/findLocation.js";

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
        this._moveCount = 0;
    }

    // Standard pawn move
    moveForwardOnce() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Beginning move
    moveForwardTwice() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 2 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    checkCapturePossible(newRow, newCol, chessBoard) {
        const tileCheck = chessBoard[newRow][newCol].spaceOccupation;

        if (tileCheck) {
            return tileCheck.pieceTeam != this.team ? true : false;
        }
    }

    // Capture to diagonal right
    captureRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col + 1;

        const canCapture = this.checkCapturePossible(newRow, newCol, chessBoard);
        return canCapture ? this.pieceBoundCheck(newRow, newCol) : null;
    }

    // Capture to diagonal left
    captureLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col - 1;

        const canCapture = this.checkCapturePossible(newRow, newCol, chessBoard);
        return canCapture ? this.pieceBoundCheck(newRow, newCol) : null;
    }

    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.moveForwardOnce(),
            this.moveForwardTwice(),
            this.captureRight(chessBoard),
            this.captureLeft(chessBoard),
        ];

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

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
