import { Piece } from "../pieces.js";
import { kingCastle } from "../../functions/castling/castling.js";
import { movingIntoAttackedPosition } from "../../util/moveIntoAttack.js";

export class King extends Piece {
    constructor(team, startingPosition) {
        super("King", team, startingPosition);
        this._inCheck = false;
        this._castleRightPos = null;
        this._castleLeftPos = null;
        this._inCheckmate = null;
    }  

    // Return whether king is in checkmate or not
    get checkmate() {
        return this._inCheckmate;
    }

    // Return location of castle on right hand side
    get rightCastle() {
        return this._castleRightPos;
    }

    // Return location of castle on left hand side
    get leftCastle() {
        return this._castleLeftPos;
    }

    // Update the position of the castle on right hand side
    set rightCastle(newPos) {
        this._castleRightPos = newPos;
    }
    
    // Update the position of the castle on left hand side
    set leftCastle(newPos) {
        this._castleLeftPos = newPos;
    }

    /**
     * @param {boolean} check
     */
    set kingInCheckmate(check) {
        this._inCheckmate = check;
    }

    // Legal moves for the king
    kingValidMoves(newRow, newCol, chessBoard) {
        return (
            !this.friendlyTileCheck(newRow, newCol, chessBoard) &&
            this.pieceBoundCheck(newRow, newCol) &&
            !movingIntoAttackedPosition(this.pieceTeam, [newRow, newCol], chessBoard)
        );
    }
    
    // Move piece logic
    moveDirection(rowChange, colChange, chessBoard) {
        const [row, col] = this._currentPosition;
        this._lastPosition = [row, col];

        const newRow = row + rowChange * this.direction;
        const newCol = col + colChange * this.direction;

        // Check the move validity using kingValidMoves
        if (this.kingValidMoves(newRow, newCol, chessBoard)) {
            return [newRow, newCol];
        } else {
            return null;
        }
    }

    // King Castling Logic
    castling(direction, chessBoard) {
        // Check castling is legal
        const castleLocation = kingCastle(this, direction, chessBoard);

        if (castleLocation) {
            if (direction === "right") {
                this.rightCastle = castleLocation;
            } else {
                this.leftCastle = castleLocation;
            }

            return castleLocation;
        }
        return null;
    }

    // Castling
    castlingRight(chessBoard) {
        return this.castling("right", chessBoard)
    }

    castlingLeft(chessBoard) {
        return this.castling("left", chessBoard);
    }

    // Generate all legal moves for the king
    generateLegalMoves(chessBoard) {
        const legalMoves = [
            this.moveUp(chessBoard),
            this.moveDown(chessBoard),
            this.moveRight(chessBoard),
            this.moveLeft(chessBoard),
            this.moveUpRight(chessBoard),
            this.moveUpLeft(chessBoard),
            this.moveDownRight(chessBoard),
            this.moveDownLeft(chessBoard),
            this.castlingRight(chessBoard),
            this.castlingLeft(chessBoard)
        ];

        return this.filterTiles(legalMoves, this);
    }

    renderPiece() {
        return this.team.toLowerCase() === "white" ? "assets/white-king.png" : "assets/black_king.png";
    }
}
