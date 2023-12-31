import { createBoard, renderChessboard, reRenderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { removeAllHighlightClasses, highlightTileOnly, pressedTile } from "./src/util/clickedPiece.js";
import { movePiece, pieceOrTile, tileFullLocation } from "./src/util/movement/movePiece.js";
import { PLAYERGAME, WHITEPLAYER, BLACKPLAYER } from "./player.js";
import { clickedEnemyPiece} from "./src/util/management/gameManagement.js";
import { checkmate } from "./src/util/checkmate/checkmate.js";
import { gameHasEnded } from "./src/util/management/managementDesign.js";
 
export const chessBoard = createBoard();

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
        initialSelectedPieceLocation = tileFullLocation(event);
        initialSelectedPiece = await pressedTile(event, chessBoard);

        clickedEnemyPiece(initialSelectedPiece, event)
    } else {
        await movePiece(initialSelectedPiece, initialSelectedPieceLocation, event, chessBoard);
        reRenderChessboard(chessBoard)

        checkmate(PLAYERGAME.currentTurn, KINGS, chessBoard);

        initialSelectedPiece = null;
    }
}

chessBoardElement.addEventListener('click', async (event) => {
    if (PLAYERGAME.status !== "finished") {
        const tileCheck = pieceOrTile(event);

        await tilePressed(tileCheck, event);

        if (PLAYERGAME.status == "finished") {
            gameHasEnded();
        }
    } 
        
});