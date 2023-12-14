export const movePiece = (chessboard, oldLocation, newLocation, piece) => {
    const [oldRow, oldCol] = oldLocation;
    const [newRow, newCol] = newLocation;
    // Empty last tile
    chessboard[oldRow][oldCol].pieceInSpace = null;
    // Update new tile
    chessboard[newRow][newCol].pieceInSpace = piece;

    console.log(`Tile Position: ${chessboard[newRow][newCol].position} has been updated`)
}