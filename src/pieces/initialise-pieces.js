import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { King } from "./king.js";
import { Queen } from "./queen.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rookie.js";
import { pieceToTileData } from "../util/pieceToTile.js";

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

// Generic function to initialize pieces on the board
const initializePieceOnBoard = (chessBoard, PieceType, team, row, col) => {
    const tileLocation = chessBoard[row][col];
    const piece = new PieceType(team, [row, col]);

    tileLocation.pieceInSpace = piece;
    pieceToTileData(tileLocation, piece);
};

// Function to initialize pawns on the board
export const initializeBoardWithPawns = (chessBoard) => {
    // Place black pawns on the second row
    for (let col = 0; col < 8; col++) {
        initializePieceOnBoard(chessBoard, Pawn, "black", 1, col);
    }

    // Place white pawns on the seventh row
    for (let col = 0; col < 8; col++) {
        initializePieceOnBoard(chessBoard, Pawn, "white", 6, col);
    }
};

// Initialise Knights
export const initializeBoardWithKnights = (chessBoard) => {
    initialPositions.knights.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Knight, "white", ...pos));
    initialPositions.knights.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Knight, "black", ...pos));
};

// Initialise Kings
export const initializeBoardWithKings = (chessBoard) => {
    initialPositions.kings.row.w.forEach(pos => initializePieceOnBoard(chessBoard, King, "white", ...pos));
    initialPositions.kings.row.b.forEach(pos => initializePieceOnBoard(chessBoard, King, "black", ...pos));
};

// Initialise Queens
export const initializeBoardWithQueens = (chessBoard) => {
    initialPositions.queens.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Queen, "white", ...pos));
    initialPositions.queens.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Queen, "black", ...pos));
};

// Initialise Bishops
export const initializeBoardWithBishops = (chessBoard) => {
    initialPositions.bishops.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Bishop, "white", ...pos));
    initialPositions.bishops.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Bishop, "black", ...pos));
};

// Initialise Rooks
export const initializeBoardWithRooks = (chessBoard) => {
    initialPositions.rooks.row.w.forEach(pos => initializePieceOnBoard(chessBoard, Rook, "white", ...pos));
    initialPositions.rooks.row.b.forEach(pos => initializePieceOnBoard(chessBoard, Rook, "black", ...pos));
};
