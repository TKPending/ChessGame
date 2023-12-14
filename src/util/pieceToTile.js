export const pieceToTileData = (tile, piece) => {
    tile.tileAvailability =  piece;
    tile.tileOwnership = piece;
    tile.pieceOnTile = piece;

    console.log(`Tile Position: ${tile.position} has been updated`);
}

export const resetTileData = (tile) => {
    tile.pieceOnTile = null;
    tile.tileOwnership = null;

    console.log(`Resetted ${tile.position}`)
}