import { Piece } from "../pieces.js";
import { highlightTile } from "../../util/clickedPiece.js";
import { indexToLocation } from "../../util/findLocation.js";

export class Bishop extends Piece {
    constructor(team, startingPosition) {
        super("Bishop", team, startingPosition);
    }

    // Bishop's Diagonal Moves
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
    
    generateLegalMoves(chessBoard) {
        const legalMoves = [];
    
        this.maxMove(legalMoves, -1, 1, chessBoard); // Diagonal Up-Right
        this.maxMove(legalMoves, -1, -1, chessBoard); // Diagonal Up-Left
        this.maxMove(legalMoves, 1, 1, chessBoard); // Diagonal Down-Right
        this.maxMove(legalMoves, 1, -1, chessBoard); // Diagonal Down-Left
    
        return this.filterTiles(legalMoves, this);
    }

    
    

    renderPiece() {
        const bishopTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-bishop.png" : "../assets/black-bishop.png";
        return bishopTeamIcon;
    }
}
