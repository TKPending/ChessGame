// import { chessBoard } from "./src/board/board.js";
import { createBoard, renderChessboard } from "./src/board/board.js";
import { Pawn } from "./src/pieces/pawn.js";
import { pieceToTileData, resetTileData } from "./src/util/pieceToTile.js";
import { movePiece } from "./src/util/movePiece.js";
import { pressedTile } from "./src/util/clickedPiece.js";

const chessBoard = createBoard();



// Function to initialize the board with pieces
const initializeBoardWithPieces = () => {
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

// Call the function to initialize the board with pieces
initializeBoardWithPieces();


renderChessboard(chessBoard);

// Add this after rendering the chessboard
const chessBoardElement = document.querySelector('.chess-board');



// Add an event listener to the chessboard element
chessBoardElement.addEventListener('click', (event) => {
    pressedTile(event, chessBoard)
});




// const test = chessBoard[1][1];
// const pawnTest = test.spaceOccupation
// pawnTest.checkPawnMovement("capture-right");
// // pieceToTileData(pawnTest.getCurrentPosition)

// setTimeout(() => {
//     movePiece(chessBoard, pawnTest.getLastPosition, pawnTest.getCurrentPosition, pawnTest)
//     pieceToTileData(chessBoard[2][2], pawnTest)
//     resetTileData(chessBoard[1][1])

//     console.log(chessBoard[2][2])
//     console.log(chessBoard[1][1])

//     renderChessboard(chessBoard)
// }, 3000)
