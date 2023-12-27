// king.js
import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/findLocation.js";
import { kingCastle } from "../util/castling.js";

export class King extends Piece {
    constructor(team, startingPosition) {
        super("King", team, startingPosition);
        this._inCheck = false;
    }  
    
    // Standard Moves
    moveUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Diagonal Moves
    moveUpRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveUpLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveDownRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    moveDownLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);

        return friendlyTile ? null : [newRow, newCol];
    }

    // Castling
    castlingRight(chessBoard) {
        const castleRightLocation = kingCastle(this, "right", chessBoard);
        return castleRightLocation ? castleRightLocation : null;
    }

    castlingLeft(chessBoard) {
        const castleLeftLocation = kingCastle(this, "left", chessBoard);
        return castleLeftLocation ? castleLeftLocation : null;
    }

    // Generate all legal moves for the king
    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.moveUp(chessBoard),
            this.moveDown(chessBoard),
            this.moveRight(chessBoard),
            this.moveLeft(chessBoard),
            this.moveUpRight(chessBoard),
            this.moveUpLeft(chessBoard),
            this.moveDownRight(chessBoard),
            this.moveDownLeft(chessBoard),
            this.castlingRight(chessBoard),
            // this.castlingLeft(chessBoard)
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
        const kingTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-king.png" : "../assets/black_king.svg.png";
        return kingTeamIcon;
    }
}
