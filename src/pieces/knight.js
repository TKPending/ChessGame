// knight.js
import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/findLocation.js";

export class Knight extends Piece {
    constructor(team, startingPosition) {
        super("Knight", team, startingPosition);
    }

    // Check for friendlies
    friendlyTileCheck(newRow, newCol, chessBoard) {
        if (this.pieceBoundCheck(newRow, newCol)) {
            const tileOccupation = chessBoard[newRow][newCol].spaceOccupation;

            return tileOccupation && tileOccupation.pieceTeam === this.team;
        }

        // Return false if the position is out of bounds
        return false;
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
