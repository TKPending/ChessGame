// Index to chess positions for Pawn
export const indexToLocationPawn = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 3 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for King
export const indexToLocationKing = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for Queen
export const indexToLocationQueen = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for Bishop
export const indexToLocationBishop = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for Knight
export const indexToLocationKnight = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] - 1;

    return file + rank;
};

// Index to chess positions for Rook
export const indexToLocationRook = (index, team) => {
    const file = String.fromCharCode(97 + index[1]);
    const rank = team.toLowerCase() === 'black' ? index[0] + 1 : index[0] - 1;

    return file + rank;
};
