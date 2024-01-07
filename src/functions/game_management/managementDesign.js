import { chessBoard } from "../../../index.js";
import { PLAYERGAME, WHITEPLAYER, BLACKPLAYER } from "./player.js";
import { clearBoard, reRenderChessboard } from "../../board/chessboard.js";
import { initialiseEachPiece } from "../../pieces/initialise-pieces.js";

const endGameModal = document.getElementById('game-finished');

export const gameHasEnded = () => {
    const winnerText = document.getElementById('winner');

    endGameModal.style.display = "flex";
    winnerText.textContent = `${PLAYERGAME.winner} is the winner!`;
};

const resetOptionElement = document.getElementById('reset');
const stayOptionElement = document.getElementById('stay');

const resetPlayer = () => {
    WHITEPLAYER.piecesCaptured = [];
    WHITEPLAYER.inCheck = null;
    WHITEPLAYER.inCheckmate = null;

    BLACKPLAYER.piecesCaptured = [];
    BLACKPLAYER.inCheck = null;
    BLACKPLAYER.inCheckmate = null;

    PLAYERGAME.currentTurn = "white";
    PLAYERGAME.previousMove = null;
    PLAYERGAME.status = "on-going";
    PLAYERGAME.moveHistory = [];
    PLAYERGAME.promotions = [];
    PLAYERGAME.checkWinning = null;
    PLAYERGAME.winner = null;
}

resetOptionElement.addEventListener("click", () => {
    // Clear and reset the board
    clearBoard(chessBoard);
    initialiseEachPiece(chessBoard);
    reRenderChessboard(chessBoard);
    resetPlayer();

    // Hide the end game modal
    endGameModal.style.display = "none";
});

stayOptionElement.addEventListener("click", () => {
    endGameModal.style.display = "none";
});
