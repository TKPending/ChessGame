// indexToLocation for all other pieces
export const indexToLocation = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? 8 - index[0] : index[0] + 1;

    return team.toLowerCase() === 'white' ? file + (9 - rank) : file + rank;
};

// indexToLocation for Pawn
export const indexToLocationPawn = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? 8 - index[0] : index[0] + 1;

    // Invert the rank for the white team
    return team.toLowerCase() === 'white' ? file + (9 - rank) : file + rank;
};

export const highlightTileLocations = (index, team) => {
    
}

// Position to index
export const positionToIndex = (position) => {
    const file = position.charAt(0).toLowerCase(); 
    const rank = parseInt(position.charAt(1), 10); 

    const colIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - rank;

    return [rowIndex, colIndex];
};

export const indexToTile = (chessBoard, indexLocation) => {
    return chessBoard[indexLocation[0]][indexLocation[1]]
}

