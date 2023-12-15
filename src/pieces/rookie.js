import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/indexToLocation.js";

export class Rook extends Piece {
    constructor(team, startingPosition) {
        super("Rook", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1;
    }

    // Rook's Vertical and Horizontal Moves
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

    // Generate all legal moves for the rook
    generateLegalMoves() {
        const legalMoves = [
            this.moveUp(),
            this.moveDown(),
            this.moveRight(),
            this.moveLeft(),
        ];

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {
            const chessMove = indexToLocation(move);
            console.log(`Potential Move: ${chessMove}`);
            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const rookTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-rook.png" : "../assets/black-rook.png";
        return rookTeamIcon;
    }
}
