// import { chessBoard } from "./src/board/board.js";
import { createBoard, renderChessboard } from "./src/board/board.js";
import { Pawn } from "./src/pieces/pawn.js";
import { pieceToTileData } from "./src/util/pieceToTile.js";

const chessBoard = createBoard();
const tileTest = chessBoard[1][1];
console.log(tileTest);

const testPawn = new Pawn("black", [1,1]);
tileTest.pieceInSpace = testPawn;
console.log(tileTest);

pieceToTileData(tileTest, testPawn)
console.log(tileTest)


// // Function to initialize the board with pieces
// const initializeBoardWithPieces = () => {
//     // Example: Place white pawns on the second row
//     for (let col = 0; col < 8; col++) {
//         chessBoard[1][col]._space.push(new Pawn("white", [1, col]));
//     }

//     // Example: Place black pawns on the seventh row
//     for (let col = 0; col < 8; col++) {
//         chessBoard[6][col]._space.push(new Pawn("black", [6, col]));
//     }
// };

// // Call the function to initialize the board with pieces
// initializeBoardWithPieces();


renderChessboard(chessBoard);