// Index to chess positions
export const indexToLocation = (index) => {
    console.log(`Index Parameter: ${index}`)
    const file = String.fromCharCode(97 + index[1]); 
    const rank = 8 - index[0]; 
    return file + rank;
}