import { Piece } from "./pieces.js";

export class Queen extends Piece {
    constructor(team, startingPosition) {
        super("Queen", team, startingPosition);
    }

    // Move anywhere
    moveForward() {

    }

    moveForwardRight() {

    }

    moveForwardLeft() {

    }

    moveBackLeft() {

    }

    moveBackRight() {

    }

    generateLegalMoves() {

    }

    renderPiece() {
        const queenTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-queen.png" : "../assets/black-queen.png";
        return queenTeamIcon;
    }
}