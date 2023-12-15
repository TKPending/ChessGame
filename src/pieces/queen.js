import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/indexToLocation.js";

export class Queen extends Piece {
    constructor(team, startingPosition) {
        super("Queen", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1; 
    }

    // TODO: Change queen logic

    // Queen's Moves
    moveUp() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDown() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDiagonalUpRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDiagonalUpLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDiagonalDownRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDiagonalDownLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    // Helper function for max moves in a given direction
    maxMove(legalMoves, rowDelta, colDelta) {
        let newRow = this._currentPosition[0] + rowDelta * this.direction;
        let newCol = this._currentPosition[1] + colDelta * this.direction;

        while (this.pieceBoundCheck(newRow, newCol)) {
            legalMoves.push([newRow, newCol]);
            newRow += rowDelta * this.direction;
            newCol += colDelta * this.direction;
        }
    }

    // Generate all legal moves for the queen
    generateLegalMoves() {
        const legalMoves = [];

        // Horizontal and Vertical Moves
        this.maxMove(legalMoves, -1, 0); // Up
        this.maxMove(legalMoves, 1, 0); // Down
        this.maxMove(legalMoves, 0, 1); // Right
        this.maxMove(legalMoves, 0, -1); // Left

        // Diagonal Moves
        this.maxMove(legalMoves, -1, 1); // Diagonal Up-Right
        this.maxMove(legalMoves, -1, -1); // Diagonal Up-Left
        this.maxMove(legalMoves, 1, 1); // Diagonal Down-Right
        this.maxMove(legalMoves, 1, -1); // Diagonal Down-Left

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
        const queenTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-queen.png" : "../assets/black-queen.png";
        return queenTeamIcon;
    }
}
