import { Pawn } from "./piece/pawn.js";
import { Knight } from "./piece/knight.js";
import { King } from "./piece/king.js";
import { Queen } from "./piece/queen.js";
import { Bishop } from "./piece/bishop.js";
import { Rook } from "./piece/rook.js"; 
import initialPositions from "./piecePositions.js";

const initialisePieceOnBoard = (chessBoard, PieceType, team, row, col) => {
    const tileLocation = chessBoard[row][col];
    const piece = new PieceType(team, [row, col]);

    // Fill tile with piece information
    tileLocation.tileAvailability = piece;
    tileLocation.pieceInSpace = piece;
    tileLocation.tileOwnership = piece;
    tileLocation.pieceOnTile = piece.getPieceName;
};

// Add pawns to board obj
const initialiseBoardWithPawns = (chessBoard) => {
    for (let col = 0; col < 8; col++) {
        initialisePieceOnBoard(chessBoard, Pawn, "black", 1, col);
        initialisePieceOnBoard(chessBoard, Pawn, "white", 6, col);
    }
};

// Add every other piece to board obj
export const initialiseEachPiece = (chessBoard) => {
    const pieceObj = [King, Knight, Queen, Bishop, Rook];
    const startingPositions = [initialPositions.kings, initialPositions.knights, initialPositions.queens, initialPositions.bishops, initialPositions.rooks];

    initialiseBoardWithPawns(chessBoard);

    // Initialise the rest of the pieces
    for (let i = 0; i < pieceObj.length; i++) {
        startingPositions[i].row.w.forEach(pos => initialisePieceOnBoard(chessBoard, pieceObj[i], "white", ...pos));
        startingPositions[i].row.b.forEach(pos => initialisePieceOnBoard(chessBoard, pieceObj[i], "black", ...pos));
    }
}
