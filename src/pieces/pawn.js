import { Piece } from "./pieces.js";

const fileSource = '/src/piece/pawn.js';

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
        this.forwardDirection = team.toLowerCase() === "white" ? 1 : -1;
        this._moveCount = 0;
    }

    // Validate pawn movement
    checkPawnMovement(move) {
        const newPosition = chosenMove(move);
        if (newPosition) {
            // Set to new position
            this.setCurrentPosition(newPosition)
            // Update UI
        } else {
            console.log(`Check ${fileSource} line 15`);
        }
    }

    // Move user has decided to do
    chosenMove(move) {
        switch (move) {
            case "one-move":
                return this.moveForwardOnce();
            case "two-move":
                return this.moveForwardTwice();
            case "take-right":
                return this.captureRight();
            case "take-left":
                return this.captureLeft();
            default:
                console.log("ERROR: Invalid Move")
                return null;
        }
    }

    // Standard pawn move
    moveForwardOnce() {
        const [row, col] = this._currentPosition;
        return this.createNewPosition([row + this.forwardDirection, col]);
    }

    // Beginning move
    moveForwardTwice() {
        const [row, col] = this._currentPosition;
        return this.createNewPosition([row + 2 * this.forwardDirection, col]);
    }

    // Capture to diagonal right
    captureRight() {
        const [row, col] = this._currentPosition;
        return this.createNewPosition([row + this.forwardDirection, col + 1]);
    }

    // Capture to diagonal left
    captureLeft() {
        const [row, col] = this._currentPosition;
        return this.createNewPosition([row + this.forwardDirection, col - 1]);
    }

    // Highlight Valid Moves
    generateLegalMoves() {
        // Implement logic for generating legal moves
    }

    renderPiece() {
        const pawnTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-pawn.png" : "../assets/black-pawn.png";
        return pawnTeamIcon;
    }
}
