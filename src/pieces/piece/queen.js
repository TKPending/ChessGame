import { Piece } from "../pieces.js";

export class Queen extends Piece {
    constructor(team, startingPosition) {
        super("Queen", team, startingPosition);
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
    generateLegalMoves(chessBoard) {
        const legalMoves = [];

        // Horizontal and Vertical Moves
        this.maxMove(legalMoves, -1, 0, chessBoard); // Up
        this.maxMove(legalMoves, 1, 0, chessBoard); // Down
        this.maxMove(legalMoves, 0, 1, chessBoard); // Right
        this.maxMove(legalMoves, 0, -1, chessBoard); // Left

        // Diagonal Moves
        this.maxMove(legalMoves, -1, 1, chessBoard); // Diagonal Up-Right
        this.maxMove(legalMoves, -1, -1, chessBoard); // Diagonal Up-Left
        this.maxMove(legalMoves, 1, 1, chessBoard); // Diagonal Down-Right
        this.maxMove(legalMoves, 1, -1, chessBoard); // Diagonal Down-Left

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        const queenTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-queen.png" : "../assets/black-queen.png";
        return queenTeamIcon;
    }
}
