import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { King } from "./king.js";
import { Queen } from "./queen.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rook.js"; 

const initialPositions = {
    "knights": {
        "row": {
            "w": [[7, 1], [7, 6]],
            "b": [[0, 1], [0, 6]]
        }
    },
    "kings": {
        "row": {
            "w": [[7, 4]],
            "b": [[0, 4]]
        }
    },
    "queens": {
        "row": {
            "w": [[7, 3]],
            "b": [[0, 3]]
        }
    },
    "bishops": {
        "row": {
            "w": [[7, 2], [7, 5]],
            "b": [[0, 2], [0, 5]]
        }
    },
    "rooks": {
        "row": {
            "w": [[7, 0], [7, 7]],
            "b": [[0, 0], [0, 7]]
        }
    }
};

const initializePieceOnBoard = (chessBoard, PieceType, team, row, col) => {
    const tileLocation = chessBoard[row][col];
    const piece = new PieceType(team, [row, col]);

    tileLocation.tileAvailability = piece;
    tileLocation.pieceInSpace = piece;
    tileLocation.tileOwnership = piece;
};

const initializeBoardWithPawns = (chessBoard) => {
    for (let col = 0; col < 8; col++) {
        initializePieceOnBoard(chessBoard, Pawn, "black", 1, col);
    }

    for (let col = 0; col < 8; col++) {
        initializePieceOnBoard(chessBoard, Pawn, "white", 6, col);
    }
};

const initializeBoardWithKnights = (chessBoard) => {
    initialPositions.knights.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Knight, "white", ...pos));
    initialPositions.knights.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Knight, "black", ...pos));
};

const initializeBoardWithKings = (chessBoard) => {
    initialPositions.kings.row.w.forEach(pos => initializePieceOnBoard(chessBoard, King, "white", ...pos));
    initialPositions.kings.row.b.forEach(pos => initializePieceOnBoard(chessBoard, King, "black", ...pos));
};

const initializeBoardWithQueens = (chessBoard) => {
    initialPositions.queens.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Queen, "white", ...pos));
    initialPositions.queens.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Queen, "black", ...pos));
};

const initializeBoardWithBishops = (chessBoard) => {
    initialPositions.bishops.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Bishop, "white", ...pos));
    initialPositions.bishops.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Bishop, "black", ...pos));
};

const initializeBoardWithRooks = (chessBoard) => {
    initialPositions.rooks.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Rook, "white", ...pos));
    initialPositions.rooks.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Rook, "black", ...pos));
};

export const initializeBoardWithPieces = (chessBoard) => {
    initializeBoardWithPawns(chessBoard);
    initializeBoardWithKnights(chessBoard);
    initializeBoardWithKings(chessBoard);
    initializeBoardWithQueens(chessBoard);
    initializeBoardWithBishops(chessBoard);
    initializeBoardWithRooks(chessBoard)
}
