import { Piece } from "../pieces.js";

export class Queen extends Piece {
    constructor(team, startingPosition) {
        super("Queen", team, startingPosition);
    }

    // Generate all legal moves for the queen
    generateLegalMoves(chessBoard) {
        const legalMoves = [];

        // Transversal and Diagonal moves
        this.maxTransversalMoves(chessBoard, legalMoves)
        this.maxDiagonalMoves(chessBoard, legalMoves)

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "../assets/white-queen.png" : "../assets/black-queen.png";
    }
}
