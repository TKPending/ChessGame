import { Piece } from "../pieces.js";

export class Rook extends Piece {
    constructor(team, startingPosition) {
        super("Rook", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1;
    }

    // Rook's Vertical and Horizontal Moves
    moveUp() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.pieceBoundCheck(row - 1 * this.direction, col);
    }

    moveDown() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.pieceBoundCheck(row + 1 * this.direction, col);
    }

    moveRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.pieceBoundCheck(row, col + 1 * this.direction);
    }

    moveLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.pieceBoundCheck(row, col - 1 * this.direction);
    }

    // Generate all legal moves for the rook
    generateLegalMoves(chessBoard) {
        const legalMoves = [];

        // Horizontal and Vertical Moves
        this.maxMove(legalMoves, -1, 0, chessBoard); // Up
        this.maxMove(legalMoves, 1, 0, chessBoard); // Down
        this.maxMove(legalMoves, 0, 1, chessBoard); // Right
        this.maxMove(legalMoves, 0, -1, chessBoard); // Left

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        const rookTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-rook.png" : "../assets/black-rook.png";
        return rookTeamIcon;
    }
}
