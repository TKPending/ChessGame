import { Pawn } from "./pawn.js";
import { Knight } from "./knight.js";
import { King } from "./king.js";
import { Queen } from "./queen.js";
import { Bishop } from "./bishop.js";
import { Rook } from "./rookie.js";
import { pieceToTileData, resetTileData } from "../util/pieceToTile.js";

// Initialise Pawns
export const initializeBoardWithPawns = (chessBoard) => {
    // Place black pawns on the second row
    for (let col = 0; col < 8; col++) {
        const tileLocation = chessBoard[1][col];
        const blackPawns = new Pawn("black", [1, col]);

        tileLocation.pieceInSpace = blackPawns;
        pieceToTileData(tileLocation, blackPawns);
    }

    // Place white pawns on seventh row
    for (let col = 0; col < 8; col++) {
        const tileLocation = chessBoard[6][col];
        const whitePawns = new Pawn("white", [6, col]);

        tileLocation.pieceInSpace = whitePawns;
        pieceToTileData(tileLocation, whitePawns)
    }
};

// Initialise Knights
export const initializeBoardWithKnights = (chessBoard) => {
    placeKnight("black", 0, 1, chessBoard);
    placeKnight("black", 0, 6, chessBoard);

    // Place white knights on the eighth row
    placeKnight("white", 7, 1, chessBoard);
    placeKnight("white", 7, 6, chessBoard);
};

// Function to place a knight on the board
const placeKnight = (team, row, col, chessBoard) => {
    const tileLocation = chessBoard[row][col];
    const knight = new Knight(team, [row, col]);

    tileLocation.pieceInSpace = knight;
    pieceToTileData(tileLocation, knight);
};


// Initialise King
export const initializeBoardWithKing = (chessBoard) => {
    // Place black king on the first row
    placeKing("black", 0, 4, chessBoard);

    // Place white king on the eighth row
    placeKing("white", 7, 4, chessBoard);
};

// Function to place a king on the board
const placeKing = (team, row, col, chessBoard) => {
    const tileLocation = chessBoard[row][col];
    const king = new King(team, [row, col]);

    tileLocation.pieceInSpace = king;
    pieceToTileData(tileLocation, king);
};

// Initialise Queens
export const initializeBoardWithQueens = (chessBoard) => {
    // Place black queen on the first row
    placeQueen("black", 0, 3, chessBoard);

    // Place white queen on the eighth row
    placeQueen("white", 7, 3, chessBoard);
};

// Function to place a queen on the board
const placeQueen = (team, row, col, chessBoard) => {
    const tileLocation = chessBoard[row][col];
    const queen = new Queen(team, [row, col]);

    tileLocation.pieceInSpace = queen;
    pieceToTileData(tileLocation, queen);
};

// Initialize Bishops
export const initializeBoardWithBishops = (chessBoard) => {
    placeBishop("black", 0, 2, chessBoard);
    placeBishop("black", 0, 5, chessBoard);

    // Place white bishops on the eighth row
    placeBishop("white", 7, 2, chessBoard);
    placeBishop("white", 7, 5, chessBoard);
};

// Initialize Rooks
export const initializeBoardWithRooks = (chessBoard) => {
    placeRook("black", 0, 0, chessBoard);
    placeRook("black", 0, 7, chessBoard);

    // Place white rooks on the eighth row
    placeRook("white", 7, 0, chessBoard);
    placeRook("white", 7, 7, chessBoard);
};

// Function to place a bishop on the board
const placeBishop = (team, row, col, chessBoard) => {
    const tileLocation = chessBoard[row][col];
    const bishop = new Bishop(team, [row, col]);

    tileLocation.pieceInSpace = bishop;
    pieceToTileData(tileLocation, bishop);
};

// Function to place a rook on the board
const placeRook = (team, row, col, chessBoard) => {
    const tileLocation = chessBoard[row][col];
    const rook = new Rook(team, [row, col]);

    tileLocation.pieceInSpace = rook;
    pieceToTileData(tileLocation, rook);
};

