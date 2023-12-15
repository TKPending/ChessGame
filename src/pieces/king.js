import { Piece } from "./pieces.js";

export class King extends Piece {
    constructor(team, startingPosition) {
        super("King", team, startingPosition);
    }

    moveForwardOnce() {

    }

    moveForwardRightOnce() {

    }

    moveForwardLeftOnce() {

    }

    moveBackLeftOnce() {

    }

    moveBackRightOnce() {

    }

    generateLegalMoves() {

    }

    renderPiece() {
        const kingTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-king.png" : "../assets/black-king.png";
        return kingTeamIcon;
    }
}