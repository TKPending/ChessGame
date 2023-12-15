import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocationQueen } from "../util/indexToLocation.js";

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

    // Generate all legal moves for the queen
    generateLegalMoves() {
        const legalMoves = [
            this.moveUp(),
            this.moveDown(),
            this.moveRight(),
            this.moveLeft(),
            this.moveDiagonalUpRight(),
            this.moveDiagonalUpLeft(),
            this.moveDiagonalDownRight(),
            this.moveDiagonalDownLeft(),
        ];

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {
            const chessMove = indexToLocationQueen(move, this.team);
            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const queenTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-queen.png" : "../assets/black-queen.png";
        return queenTeamIcon;
    }
}
