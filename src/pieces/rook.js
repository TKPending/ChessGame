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
    generateLegalMoves() {
        const legalMoves = [];

        // Horizontal and Vertical Moves
        this.maxMove(legalMoves, -1, 0); // Up
        this.maxMove(legalMoves, 1, 0); // Down
        this.maxMove(legalMoves, 0, 1); // Right
        this.maxMove(legalMoves, 0, -1); // Left

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {

            const chessMove = indexToLocation(move, this.team);
            console.log(`\n${this.name}: Potential Moves: ${move} (${chessMove})\n`)

            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const rookTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-rook.png" : "../assets/black-rook.png";
        return rookTeamIcon;
    }
}
