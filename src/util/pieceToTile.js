export const pieceToTileData = (tile, piece) => {
    tile.tileAvailability =  piece;
    tile.tileOwnership = piece;
    tile.pieceOnTile = piece;
}

export const resetTileData = (tile) => {
    tile.pieceOnTile = null;
    tile.tileOwnership = null;

    console.log(`Resetted ${tile.position}`)
}