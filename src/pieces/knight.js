import { Piece } from "./pieces.js";

export class Knight extends Piece {
    constructor(team, startingPosition) {
        super("King", team, startingPosition);
    }

    jumpUpRight() {

    }

    jumpUpLeft() {

    }

    jumpDownRight() {

    }

    jumpDownLeft() {

    }

    generateLegalMoves() {

    }

    renderPiece() {
        const knightTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-knight.png" : "../assets/black-knight.png";
        return knightTeamIcon;
    }
}