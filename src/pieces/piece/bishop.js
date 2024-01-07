import { Piece } from "../pieces.js";

export class Bishop extends Piece {
    constructor(team, startingPosition) {
        super("Bishop", team, startingPosition);
    }

    generateLegalMoves(chessBoard) {
        const legalMoves = [];

        this.maxDiagonalMoves(chessBoard, legalMoves)

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "../assets/white-bishop.png" : "../assets/black-bishop.png";
    }
}
