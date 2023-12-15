import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/indexToLocation.js";

export class Bishop extends Piece {
    constructor(team, startingPosition) {
        super("Bishop", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1;
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

    // Generate all legal moves for the bishop
    generateLegalMoves() {
        const legalMoves = [
            this.moveDiagonalUpRight(),
            this.moveDiagonalUpLeft(),
            this.moveDiagonalDownRight(),
            this.moveDiagonalDownLeft(),
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
        const bishopTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-bishop.png" : "../assets/black-bishop.png";
        return bishopTeamIcon;
    }
}
