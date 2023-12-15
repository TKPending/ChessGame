// pawn.js
import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocationPawn } from "../util/indexToLocation.js";

const fileSource = '/src/piece/pawn.js';

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
        this.direction = team.toLowerCase() === "white" ? 1 : -1;
        this._moveCount = 0;
    }

    // Standard pawn move
    moveForwardOnce() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        console.log(`Original Position: ${this._lastPosition}\nNew Position: ${newRow},${newCol}`)

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

    // Capture to diagonal right
    captureRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col + 1;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Capture to diagonal left
    captureLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + this.direction;
        const newCol = col - 1;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Highlight Valid Moves
    // TODO: Keep in mind spaces which have pieces
    generateLegalMoves() {
        const legalMoves = [
            this.moveForwardOnce(),
            this.moveForwardTwice(),
            this.captureRight(),
            this.captureLeft(),
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
