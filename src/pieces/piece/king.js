// king.js
import { Piece } from "../pieces.js";
import { kingCastle } from "../../util/castling.js";
import { checkTestRun } from "../../util/checkmate/movingIntoCheck.js";

export class King extends Piece {
    constructor(team, startingPosition) {
        super("King", team, startingPosition);
        this._inCheck = false;
        this._castleRightPos = null;
        this._castleLeftPos = null;
        this._inCheckmate = null;
    }  

    get checkmate() {
        return this._inCheckmate;
    }

    get rightCastle() {
        return this._castleRightPos;
    }

    get leftCastle() {
        return this._castleLeftPos;
    }

    set rightCastle(newPos) {
        this._castleRightPos = newPos;
    }
    
    set leftCastle(newPos) {
        this._castleLeftPos = newPos;
    }

    set kingInCheckmate(check) {F
        this._inCheckmate = check;
    }
    
    // Standard Moves
    moveUp(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveDown(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Diagonal Moves
    moveUpRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveUpLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveDownRight(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col + 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    moveDownLeft(chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col - 1 * this.direction;

        const friendlyTile = this.friendlyTileCheck(newRow, newCol, chessBoard);
        const validTile = this.pieceBoundCheck(newRow, newCol);

        return !friendlyTile && validTile ? [newRow, newCol] : null;
    }

    // Castling
    castlingRight(chessBoard) {
        const castleRightLocation = kingCastle(this, "right", chessBoard);
        if (castleRightLocation) {
            this.rightCastle = castleRightLocation;
            return castleRightLocation;
        }

        return null;
    }

    castlingLeft(chessBoard) {
        const castleLeftLocation = kingCastle(this, "left", chessBoard);
        if (castleLeftLocation) {
            this.leftCastle = castleLeftLocation;
            return castleLeftLocation;
        }

        return null;
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
            this.castlingLeft(chessBoard)
        ];

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        const kingTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-king.png" : "../assets/black_king.svg.png";
        return kingTeamIcon;
    }
}
