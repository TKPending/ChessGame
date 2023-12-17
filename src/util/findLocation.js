// Index to chess positions for Pawn
export const indexToLocationPawn = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 3 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for all other pieces
export const indexToLocation = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] + 1;

    return file + rank;
};

// Position to index
export const positionToIndex = (position) => {
    const file = position.charAt(0).toLowerCase(); 
    const rank = parseInt(position.charAt(1), 10); 

    const colIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - rank;

    return [rowIndex, colIndex];
};

