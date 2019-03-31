const tokenColors = ['red', 'green', 'yellow', 'blue', 'orange'];

let blueTokens = 20;
let greenTokens = 20;
let redTokens = 20;
let orangeTokens = 20;
let yellowTokens = 20;

let currentlySelectedToken;
let currentTokenId;


class Token {

    tokenId;
    currentTile;
    tokenElementId;


    constructor(tokenId, tokenElementId, tile) {

        this.setCurrentTile(tile);
        this.setTokenElementId(tokenElementId);
        this.setTokenId(tokenId);
    }

    setCurrentTile(tile) {
        this.currentTile = tile;
    }

    getCurrentTile() {
        return this.currentTile;
    }

    setTokenId(tokenId) {
        this.tokenId = tokenId;
    }

    getTokenId() {
        return this.tokenId;
    }

    setTokenElementId(tokenElementId)
    {
        this.tokenElementId = tokenElementId;
    }

    getTokenElementId()
    {
        return this.tokenElementId;
    }


    static getTokenColors() {
        return tokenColors;
    }

    static colorHasMoreThanZeroTokens(color) {
        switch (color) {
            case tokenColors[0]:
                return redTokens > 0;
            case tokenColors[1]:
                return greenTokens > 0;
            case tokenColors[2]:
                return yellowTokens > 0;
            case tokenColors[3]:
                return blueTokens > 0;
            case tokenColors[4]:
                return orangeTokens > 0;
        }
    }

    static removeTokenFromPool(color) {
        switch (color) {
            case tokenColors[0]:
                redTokens--;
                break;
            case tokenColors[1]:
                greenTokens--;
                break;
            case tokenColors[2]:
                yellowTokens--;
                break;
            case tokenColors[3]:
                blueTokens--;
                break;
            case tokenColors[4]:
                orangeTokens--;
                break;
        }
    }

    static setCurrentlySelectedToken(token) {
        currentlySelectedToken = token;
    }

    static getCurrentlySelectedToken() {
        return currentlySelectedToken;
    }


}

export default Token;