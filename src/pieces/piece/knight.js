// knight.js
import { Piece } from "../pieces.js";

export class Knight extends Piece {
    constructor(team, startingPosition) {
        super("Knight", team, startingPosition);
    }

    // Up and Right
    jumpUpRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 2 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Up and Left
    jumpUpLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row - 2 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Down and right
    jumpDownRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row + 2 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Down and Left
    jumpDownLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 2 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Right and Up
    jumpRightUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Right and Down
    jumpRightDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Left and Up
    jumpLeftUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Left and Down
    jumpLeftDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Generate all legal moves for the knight
    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.jumpUpRight(chessBoard),
            this.jumpUpLeft(chessBoard),
            this.jumpDownRight(chessBoard),
            this.jumpDownLeft(chessBoard),
            this.jumpRightUp(chessBoard),
            this.jumpRightDown(chessBoard),
            this.jumpLeftUp(chessBoard),
            this.jumpLeftDown(chessBoard),
        ];

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        const knightTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-knight.png" : "../assets/black-knight.png";
        return knightTeamIcon;
    }
}
