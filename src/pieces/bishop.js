import { Piece } from "./pieces.js";

export class Bishop extends Piece {
    constructor(team, startingPosition) {
        super("Bishop", team, startingPosition);
    }

    moveUpRight() {

    }

    moveUpLeft() {

    }

    moveBottomLeft() {

    }

    moveBottomRight() {

    }

    generateLegalMoves() {

    }

    renderPiece() {
        const bishopTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-bishop.png" : "../assets/black-bishop.png";
        return bishopTeamIcon;
    }
}