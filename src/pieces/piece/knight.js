// knight.js
import { Piece } from "../pieces.js";

export class Knight extends Piece {
    constructor(team, startingPosition) {
        super("Knight", team, startingPosition);
    }
    
    // Specific jump methods
    jumpUpRight(chessBoard) {
        return this.moveDirection(-2, -1, chessBoard);
    }
    
    jumpUpLeft(chessBoard) {
        return this.moveDirection(-2, 1, chessBoard);
    }
    
    jumpDownRight(chessBoard) {
        return this.moveDirection(2, 1, chessBoard);
    }
    
    jumpDownLeft(chessBoard) {
        return this.moveDirection(2, -1, chessBoard);
    }
    
    jumpRightUp(chessBoard) {
        return this.moveDirection(-1, 2, chessBoard);
    }
    
    jumpRightDown(chessBoard) {
        return this.moveDirection(1, 2, chessBoard);
    }
    
    jumpLeftUp(chessBoard) {
        return this.moveDirection(-1, -2, chessBoard);
    }
    
    jumpLeftDown(chessBoard) {
        return this.moveDirection(1, -2, chessBoard);
    }

    // Generate all legal moves for the knight
    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.jumpUpRight(chessBoard),
            this.jumpUpLeft(chessBoard),
            this.jumpDownRight(chessBoard),
            this.jumpDownLeft(chessBoard),
            this.jumpRightUp(chessBoard),
            this.jumpRightDown(chessBoard),
            this.jumpLeftUp(chessBoard),
            this.jumpLeftDown(chessBoard),
        ];

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "../assets/white-knight.png" : "../assets/black-knight.png";
    }
}
