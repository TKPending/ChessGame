import { Piece } from "./pieces.js";

export class Rook extends Piece {
    constructor(team, startingPosition) {
        super("Rook", team, startingPosition);
    }

    moveForward() {

    }

    moveForwardRight() {

    }

    moveLeft() {

    }

    moveRight() {

    }

    generateLegalMoves() {

    }

    renderPiece() {
        const RookTeamIcon = this.team.toLowerCase() === "white" ? "../assets/rook-king.png" : "../assets/black-rook.png";
        return RookTeamIcon;
    }
}