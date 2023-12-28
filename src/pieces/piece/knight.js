// knight.js
import { Piece } from "../pieces.js";
import { highlightTile } from "../../util/clickedPiece.js";
import { indexToLocation } from "../../util/findLocation.js";

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

        return friendlyTile ? null : [newRow, newCol];
    }

    // Up and Left
    jumpUpLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row - 2 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Down and right
    jumpDownRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        
        const newRow = row + 2 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Down and Left
    jumpDownLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 2 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Right and Up
    jumpRightUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Right and Down
    jumpRightDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Left and Up
    jumpLeftUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Left and Down
    jumpLeftDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 2 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
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

        return this.filterAndHighlightTiles(legalMoves, this.team);
    }

    renderPiece() {
        const knightTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-knight.png" : "../assets/black-knight.png";
        return knightTeamIcon;
    }
}
