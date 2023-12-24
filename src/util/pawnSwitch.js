import { Knight } from '../pieces/knight.js';
import { Queen } from '../pieces/queen.js';
import { Bishop } from '../pieces/bishop.js';
import { Rook } from '../pieces/rook.js';
import { reRenderChessboard } from "../board/board.js";

const endOfBoards = (team) => {
    return team == "white" ? 0 : 7;
}

const checkPawnLocation = (currentPawnPosition, endRow) => {
    return currentPawnPosition[0] == endRow ? true : false;
}

const transferPieceInformation = (oldPiece, newPiece) => {
    newPiece.transferStartingPosition = oldPiece.getStartingPosition;
    newPiece.updateCurrentPosition = oldPiece.getCurrentPosition;
    newPiece.updateLastPosition = oldPiece.getLastPosition;
}

const generateNewPiece = (newPieceName, oldPiece, pawnLocationIndex) => {
    switch (newPieceName) {
        case "Rook":
            return new Rook(oldPiece.pieceTeam, pawnLocationIndex);
        case "Bishop":
            return new Bishop(oldPiece.pieceTeam, pawnLocationIndex);
        case "Knight":
            return new Knight(oldPiece.pieceTeam, pawnLocationIndex);
        default:
            return new Queen(oldPiece.pieceTeam, pawnLocationIndex);
    }
}

const updateTile = (newPieceName, oldPiece, pawnLocationIndex, tile) => {
    tile.pieceInSpace = [];

    const newPiece = generateNewPiece(newPieceName, oldPiece, pawnLocationIndex);
    transferPieceInformation(oldPiece, newPiece);

    tile.pieceInSpace = newPiece;
}

const hidePromotionOptions = () => {
    const popupContainer = document.getElementById('popup-container');

    while (popupContainer.firstChild) {
        popupContainer.removeChild(popupContainer.firstChild);
    }
}


const changePawn = (pawnLocationIndex, pawnPiece, newPieceName, chessBoard) => {
    const tileLocation = chessBoard[pawnLocationIndex[0]][pawnLocationIndex[1]];

    updateTile(newPieceName, pawnPiece, pawnLocationIndex, tileLocation);
    reRenderChessboard(chessBoard);
    hidePromotionOptions();
}

const renderPieceOptions = (teamColour, currentPawnLocation, pawnPiece, chessBoard) => {
    const chosenPieceOptions = pieceOptions(teamColour);

    for (const option of chosenPieceOptions) {
        const pieceElement = document.createElement('div');
        pieceElement.innerHTML = `<img src="${option.path}" alt="${option.name}" />`;

        pieceElement.addEventListener('click', () => changePawn(currentPawnLocation, pawnPiece, option.name, chessBoard));

        // Append the piece element to the popup container
        document.getElementById('popup-container').appendChild(pieceElement);
    }
}

const pieceOptions = (teamColour) => {
    // Array of piece objects with names and image paths
    const pieces = [
        { name: 'Rook', path: `../assets/${teamColour}-rook.png` },
        { name: 'Bishop', path: `../assets/${teamColour}-bishop.png` },
        { name: 'Knight', path: `../assets/${teamColour}-knight.png` },
        { name: 'Queen', path: `../assets/${teamColour}-queen.png` },
    ];

    return pieces;
}

export const pawnConvert = (pawnPiece, chessBoard) => {
    const currentPawnLocation = pawnPiece.getCurrentPosition;
    const endRows = endOfBoards(pawnPiece.pieceTeam);
    const inEndRow = checkPawnLocation(currentPawnLocation, endRows);
    const currentTeam = pawnPiece.pieceTeam;

    if (inEndRow) {
        renderPieceOptions(currentTeam, currentPawnLocation, pawnPiece, chessBoard);
    }
}