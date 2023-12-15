import { removeAllHighlightClasses, pressedElement, findTileByPosition, pressedTile } from "./clickedPiece.js"

const getDestination = async (event, chessBoard) => {
    const destinationTile = await pressedTile(event, chessBoard);

    return destinationTile
}

const checkValidMove = (tileLocation, validMoves) => {
    return validMoves.some(move => move[0] === tileLocation[0] && move[1] === tileLocation[1]);
};



export const positionToIndex = (position) => {
    const file = position.charAt(0).toLowerCase(); 
    const rank = parseInt(position.charAt(1), 10); 

    const colIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - rank;

    return [rowIndex, colIndex];
};


export const movePiece = async (selectedPiece, event, chessBoard) => {
    const validPieceMoves = selectedPiece.getValidMoves;
    const destinationTile = await getDestination(event, chessBoard);
    const destinationLocation = destinationTile.position;

    // convert destination location to indexes
    const destinationIndex = positionToIndex(destinationLocation);

    const validMove = checkValidMove(destinationIndex, validPieceMoves);
    console.log('validMove:', validMove); // Add this line

    if (validMove) {
        const newTile = findTileByPosition(chessBoard, destinationLocation);
        console.log(newTile);
    }

    // MOVE TO NEW TILE

    // EMPTY PREVIOUS TILE
};
