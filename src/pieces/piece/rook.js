import { Piece } from "../pieces.js";

export class Rook extends Piece {
    constructor(team, startingPosition) {
        super("Rook", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1;
    }

    // Generate all legal moves for the rook
    generateLegalMoves(chessBoard) {
        const legalMoves = [];

        this.maxTransversalMoves(chessBoard, legalMoves);

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "assets/white-rook.png" : "assets/black-rook.png";
    }
}
