export const movePieceData = (chessboard, oldLocation, newLocation, piece) => {
    const [oldRow, oldCol] = oldLocation;
    const [newRow, newCol] = newLocation;
    // Empty last tile
    chessboard[oldRow][oldCol].pieceInSpace = null;
    // Update new tile
    chessboard[newRow][newCol].pieceInSpace = piece;

    console.log(`Tile Position: ${chessboard[newRow][newCol].position} has been updated`)
}


export const movePiece = (board, ) => {
    const test = chessBoard[1][1];
    const pawnTest = test.spaceOccupation
    pawnTest.checkPawnMovement("capture-right");
    // pieceToTileData(pawnTest.getCurrentPosition)


    movePiece(chessBoard, pawnTest.getLastPosition, pawnTest.getCurrentPosition, pawnTest)
    pieceToTileData(chessBoard[2][2], pawnTest)
    resetTileData(chessBoard[1][1])

    console.log(chessBoard[2][2])
    console.log(chessBoard[1][1])

    renderChessboard(chessBoard)
}