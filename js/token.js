const tokenColors = ['red', 'green', 'yellow', 'blue', 'orange'];

class Token {

    blueTokens = 20;
    greenTokens = 20;
    redTokens = 20;
    orangeTokens = 20;
    yellowTokens = 20;

    static getTokenColors() {
        return tokenColors;
    }

    colorHasMoreThanZeroTokens(color)
    {
        switch (color)
        {
            case tokenColors[0]:
                return this.redTokens > 0;
            case tokenColors[1]:
                return this.greenTokens > 0;
            case tokenColors[2]:
                return this.yellowTokens > 0;
            case tokenColors[3]:
                return this.blueTokens > 0;
            case tokenColors[4]:
                return this.orangeTokens > 0;
        }
    }

    removeTokenFromPool(color)
    {
        switch (color)
        {
            case tokenColors[0]:
                this.redTokens--;
                break;
            case tokenColors[1]:
                this.greenTokens--;
                break;
            case tokenColors[2]:
                this.yellowTokens--;
                break;
            case tokenColors[3]:
                this.blueTokens--;
                break;
            case tokenColors[4]:
                this.orangeTokens--;
                break;
        }
    }

}

export default Token;