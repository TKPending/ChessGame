import { PLAYERGAME } from "../../../player.js";
import { findTileByPosition, pressedElement } from "../clickedPiece.js";

export const clickedEnemyPiece = (initialPiece, event) => {
    if (initialPiece.pieceTeam !== PLAYERGAME.currentTurn) {
        highlightEnemyPiece(event);
        initialPiece = undefined;
    }
}

const highlightEnemyPiece = (event) => {
    const clickedElement = event.target;
    const tilePosition = pressedElement(clickedElement);
    const tileElementDOM = document.getElementById(tilePosition);

    if (tileElementDOM) {
        tileElementDOM.classList.add('highlighted-red');
    }
}