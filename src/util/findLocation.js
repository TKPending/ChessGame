// Convert index to algebraic version
export const indexToLocation = (index, team) => {
    if (!index) {
        return null;
    }
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? 8 - index[0] : index[0] + 1;

    return team.toLowerCase() === 'white' ? file + (9 - rank) : file + rank;
};

// Convert algebraic version to index
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

