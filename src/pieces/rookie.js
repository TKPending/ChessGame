import { Piece } from "./pieces.js";
import { highlightTile } from "../util/clickedPiece.js";
import { indexToLocation } from "../util/indexToLocation.js";

export class Rook extends Piece {
    constructor(team, startingPosition) {
        super("Rook", team, startingPosition);
        this.direction = team.toLowerCase() === "black" ? 1 : -1;
    }

    // Rook's Vertical and Horizontal Moves
    moveUp() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row - 1 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveDown() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + 1 * this.direction;
        const newCol = col;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveRight() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col + 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    moveLeft() {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row;
        const newCol = col - 1 * this.direction;

        return this.pieceBoundCheck(newRow, newCol);
    }

    maxMove(legalMoves) {
        // Check moves upward
        let moveUpRow = this._currentPosition[0] - 1;
        while (this.pieceBoundCheck(moveUpRow, this._currentPosition[1])) {
            legalMoves.push([moveUpRow, this._currentPosition[1]]);
            moveUpRow--;
        }
    
        // Check moves downward
        let moveDownRow = this._currentPosition[0] + 1;
        while (this.pieceBoundCheck(moveDownRow, this._currentPosition[1])) {
            legalMoves.push([moveDownRow, this._currentPosition[1]]);
            moveDownRow++;
        }
    
        // Check moves to the right
        let moveRightCol = this._currentPosition[1] + 1;
        while (this.pieceBoundCheck(this._currentPosition[0], moveRightCol)) {
            legalMoves.push([this._currentPosition[0], moveRightCol]);
            moveRightCol++;
        }
    
        // Check moves to the left
        let moveLeftCol = this._currentPosition[1] - 1;
        while (this.pieceBoundCheck(this._currentPosition[0], moveLeftCol)) {
            legalMoves.push([this._currentPosition[0], moveLeftCol]);
            moveLeftCol--;
        }
    }

    // Generate all legal moves for the rook
    generateLegalMoves() {
        const legalMoves = [];
        
        this.maxMove(legalMoves);

        // Filter out null moves (moves outside the chessboard)
        const filteredMoves = legalMoves.filter(move => move !== null);

        // Highlight the valid moves on the UI
        for (const move of filteredMoves) {
            const chessMove = indexToLocation(move, this.team);
            highlightTile(chessMove);
        }

        return filteredMoves;
    }

    renderPiece() {
        const rookTeamIcon = this.team.toLowerCase() === "white" ? "../assets/white-rook.png" : "../assets/black-rook.png";
        return rookTeamIcon;
    }
}
