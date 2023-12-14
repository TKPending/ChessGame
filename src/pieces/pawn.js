import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";

const fileSource = '/src/piece/pawn.js';

export class Pawn extends Piece {
    constructor(team, startingPosition) {
        super("Pawn", team, startingPosition);
        this.forwardDirection = team.toLowerCase() === "black" ? 1 : -1;
        this._moveCount = 0;
        this.lastPosition = this._lastPosition;
    }

    // Move user has decided to do - Returns new 2D Array Position
    chosenMove(move) {
        const [row, col] = move; // Destructure the move array
        switch (true) {
            case row === this._currentPosition[0] + this.forwardDirection && col === this._currentPosition[1]:
                return this.moveForwardOnce();
            case row === this._currentPosition[0] + 2 * this.forwardDirection && col === this._currentPosition[1]:
                return this.moveForwardTwice();
            case row === this._currentPosition[0] + this.forwardDirection && col === this._currentPosition[1] + 1:
                return this.captureRight();
            case row === this._currentPosition[0] + this.forwardDirection && col === this._currentPosition[1] - 1:
                
                return this.captureLeft();
            default:
                console.log("ERROR: Invalid Move");
                return null;
        }
    }
    

    // Validate pawn movement
    checkPawnMovement(move) {
        const newPosition = this.chosenMove(move);
        if (newPosition) {
            console.log(`New Position: ${newPosition}`);
            // Set to new position
            this.setCurrentPosition(newPosition)
            // Update UI
        } else {
            console.log(`Check ${fileSource} line 15`);
        }
    }

    // Standard pawn move
    moveForwardOnce() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        console.log([row + this.forwardDirection, col])
        return this.createNewPosition([row + this.forwardDirection, col]);
    }

    // Beginning move
    moveForwardTwice() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.createNewPosition([row + 2 * this.forwardDirection, col]);
    }

    // Capture to diagonal right
    captureRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        return this.createNewPosition([row + this.forwardDirection, col + 1]);
    }

    // Capture to diagonal left
    captureLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];
        return this.createNewPosition([row + this.forwardDirection, col - 1]);
    }

    // Highlight Valid Moves
    generateLegalMoves() {
        
    }


    renderPiece() {
        const pawnTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-pawn.png" : "../assets/black-pawn.png";
        return pawnTeamIcon;
    }
}
