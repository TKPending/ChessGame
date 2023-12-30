import { createBoard, renderChessboard, reRenderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { removeAllHighlightClasses, highlightTileOnly, pressedTile } from "./src/util/clickedPiece.js";
import { movePiece, pieceOrTile, tileFullLocation } from "./src/util/movement/movePiece.js";
import { PLAYERGAME, WHITEPLAYER, BLACKPLAYER } from "./player.js";
import { checkmate } from "./src/util/checkmate/checkmate.js";
 
const chessBoard = createBoard();

initializeBoardWithPieces(chessBoard)

renderChessboard(chessBoard);

const bodyElement = document.getElementById('body');
const chessBoardElement = document.querySelector('.chess-board');

let initialSelectedPiece;
let initialSelectedPieceLocation;

// Keep track of kings for check / checkmate
const KINGS = {
    "white": chessBoard[7][4].spaceOccupation,
    "black": chessBoard[0][4].spaceOccupation
}

bodyElement.addEventListener('click', (event) => {
    const isClickedOnChessboard = chessBoardElement.contains(event.target);

    if (!isClickedOnChessboard) {
        removeAllHighlightClasses(chessBoard); 
        initialSelectedPiece = null;
    }
});

const tilePressed = async (tileCheck, event) => {
    if (tileCheck && !initialSelectedPiece) {
        highlightTileOnly(event, chessBoard);
    } else if (!tileCheck && !initialSelectedPiece) {
        const playerTurn = PLAYERGAME.currentTurn;

        initialSelectedPieceLocation = tileFullLocation(event);
        initialSelectedPiece = await pressedTile(event, chessBoard);
    } else {
        await movePiece(initialSelectedPiece, initialSelectedPieceLocation, event, chessBoard);
        reRenderChessboard(chessBoard);

        // checkmate(initialSelectedPiece.pieceTeam, KINGS, chessBoard);

        initialSelectedPiece = null;
    }
}

chessBoardElement.addEventListener('click', async (event) => {
    const tileCheck = pieceOrTile(event);

    await tilePressed(tileCheck, event);
});