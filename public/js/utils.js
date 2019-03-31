export const chooseRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const checkMoveIsWithinRange = (tileToMove, selectedToken) => {
    return (selectedToken + 1 == tileToMove) || (selectedToken - 1 == tileToMove) ||
        (selectedToken + 10 == tileToMove) || (selectedToken - 10 == tileToMove) ||
        (selectedToken + 11 == tileToMove) || (selectedToken - 11 == tileToMove) ||
        (selectedToken + 9 == tileToMove) || (selectedToken - 9 == tileToMove)
}