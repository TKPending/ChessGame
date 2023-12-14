import { Piece } from "./pieces.js";

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
        this.forwardDirection = team.toLowerCase() === "white" ? 1 : -1;
    }

    // Standard pawn move
    moveForwardOnce() {
        const [row, col] = this._currentPosition;
        this.setCurrentPosition([row + this.forwardDirection, col]);
    }

    // Beginning move
    moveForwardTwice() {
        const [row, col] = this._currentPosition;
        this.setCurrentPosition([row + 2 * this.forwardDirection, col]);
    }

    // Capture to diagonal right
    captureRight() {
        const [row, col] = this._currentPosition;
        this.setCurrentPosition([row + this.forwardDirection, col + 1]);
    }

    // Capture to diagonal left
    captureLeft() {
        const [row, col] = this._currentPosition;
        this.setCurrentPosition([row + this.forwardDirection, col - 1]);
    }

    generateLegalMoves() {
        // Implement logic for generating legal moves
    }

    renderPiece() {
        const pawnTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-pawn.png" : "../assets/black-pawn.png";
        return pawnTeamIcon;
    }
}
