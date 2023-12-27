export const resetTileData = (tile) => {
    tile.pieceOnTile = null;
    tile.tileOwnership = null;

    console.log(`Resetted ${tile.position}`)
}