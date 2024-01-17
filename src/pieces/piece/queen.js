import { Piece } from "../pieces.js";

export class Queen extends Piece {
    constructor(team, startingPosition) {
        super("Queen", team, startingPosition);
        this._allQueenMoves = [];
    }

    get allQueenMoves() {
        return this._allQueenMoves;
    }

    set allQueenMoves(empty) {
        this._allQueenMoves = empty;
    }  

    // Generate all legal moves for the queen
    generateLegalMoves(chessBoard) {
        const legalMoves = [];
        this.allQueenMoves = [];

        // Transversal and Diagonal moves
        this.maxTransversalMoves(chessBoard, legalMoves);
        this.maxDiagonalMoves(chessBoard, legalMoves);

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "assets/white-queen.png" : "assets/black-queen.png";
    }
}
