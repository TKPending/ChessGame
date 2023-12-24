// knight.js
import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/findLocation.js";

export class Knight extends Piece {
    constructor(team, startingPosition) {
        super("Knight", team, startingPosition);
    }

    // Knight's L-shaped Moves
    jumpUpRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 2 * this.direction;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpUpLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row - 2 * this.direction;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpDownRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row + 2 * this.direction;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpDownLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 2 * this.direction;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Additional L-shaped Moves
    jumpRightUp() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 2 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpRightDown() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 2 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpLeftUp() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 2 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    jumpLeftDown() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 2 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Generate all legal moves for the knight
    generateLegalMoves() {
        const legalMoves = [
            this.jumpUpRight(),
            this.jumpUpLeft(),
            this.jumpDownRight(),
            this.jumpDownLeft(),
            this.jumpRightUp(),
            this.jumpRightDown(),
            this.jumpLeftUp(),
            this.jumpLeftDown(),
        ];

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {
            const chessMove = indexToLocation(move, this.team);
            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const knightTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-knight.png" : "../assets/black-knight.png";
        return knightTeamIcon;
    }
}
