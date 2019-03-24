const boardContainer = document.getElementById('board-container');
const tableBody = document.getElementById('table-body');
const currentPlayerDisplay = document.getElementById('current-player');
let selectedToken = null;
let redTokens = 20;
let greenTokens = 20;
let blueTokens = 20;
let orangeTokens = 20;
let yellowTokens = 20;

const tokenColors = [{
    color: 'red',
    hexValue: '#d63031'
},
    {
        color: 'blue',
        hexValue: '#0984e3'
    },
    {
        color: 'green',
        hexValue: '#00b808'
    },
    {
        color: 'yellow',
        hexValue: '#f9ca24'
    },
    {
        color: 'orange',
        hexValue: '#f99a00'
    }
];

const players =
    {
        PLAYER_ONE: 'Player One',
        PLAYER_TWO: 'Player Two',
        PLAYER_THREE: 'Player Three',
        PLAYER_FOUR: 'Player Four'
    };

function main() {
    createBoard();
    placeTokensOnBoard();
    updateSelectedTokenOnTokenClick();
    registerTileClicks();
    setCurrentPlayerDisplay(players.PLAYER_ONE);
}

function createBoard() {
    let counter = 0;
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let td = document.createElement('td');
            td.setAttribute("style", "border:2px solid #341f97; ");
            td.id = `tile-${counter}`;
            tr.appendChild(td);
            counter++;
        }
        tableBody.appendChild(tr);
    }
}

function placeTokensOnBoard() {

    //Place tokens on board
    /*
    1.iterate over each tile.
    2. randomly place one of four-colored tokens
    3. exclude four middle tiles
    */

    let token;
    let tile;
    let counter = 0;
    for (let i = 0; i < 100; i++) {

        if (isNotFourCenterTiles(i)) {
            tile = document.getElementById(`tile-${i}`);
            token = document.createElement('div');
            //randomize utility here
            token.id = `token-${counter}`;
            token.className = getRandomTokenColor();
            tile.append(token);
            counter++;
        }
    }

}

function isNotFourCenterTiles(index) {
    if (index !== 44 && index !== 45 && index !== 54 && index !== 55) {
        return true;
    }
}


//Only 96 tokens will be placed on board. Only 20 of each token color.
function getRandomTokenColor() {
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    let randomColor;

    switch (randomNumber) {
        case 1:
            if (redTokens > 0) {
                randomColor = 'red token';
                redTokens--;
                return randomColor;
            } else {
                randomColor = getRandomTokenColor();
            }
            break;
        case 2:
            if (greenTokens > 0) {
                randomColor = 'green token';
                greenTokens--;
                return randomColor;
            } else {
                randomColor = getRandomTokenColor();
            }
            break;
        case 3:
            if (blueTokens > 0) {
                randomColor = 'blue token';
                blueTokens--;
                return randomColor;
            } else {
                randomColor = getRandomTokenColor();
            }
            break;
        case 4:
            if (orangeTokens > 0) {
                randomColor = 'orange token';
                orangeTokens--;
                return randomColor;
            } else {
                randomColor = getRandomTokenColor();
            }
            break;
        case 5:
            if (yellowTokens > 0) {
                randomColor = 'yellow token';
                yellowTokens--;
                return randomColor;
            } else {
                randomColor = getRandomTokenColor();
            }
            break;
    }

    return randomColor;

}

function updateSelectedTokenOnTokenClick() {
    for (let i = 0; i < 96; i++) {
        let token = document.getElementById(`token-${i}`);
        token.addEventListener('click', () => {
            console.log(`Selected token with id ${i}`);

            if (noTokensAreSelected()) {
                token.classList.toggle('select-token');
                selectedToken = token;
            } else if (token === selectedToken) {
                //Deselecting the token.
                token.classList.toggle('select-token');
                selectedToken = null;
            } else {
                selectedToken.classList.toggle('select-token');
                token.classList.toggle('select-token');
                selectedToken = token;
            }
        });
    }
}

function registerTileClicks() {

    /*Only one token can be selected. First the token where the token
    * is coming from is selected and then the player chooses where
    * the token should move to and the initial token will no longer
    * be selected.*/

    for (let i = 0; i < 100; i++) {
        let tile = document.getElementById(`tile-${i}`);
        tile.addEventListener('click', () => {
            console.log(`Selected tile with id ${i}`);

            if (!noTokensAreSelected() && !tileHasToken(tile)) {
                //We can make a move to this tile.
            } else {
                //We can't move to this tile.
            }

        });
    }
}

function noTokensAreSelected() {
    return selectedToken == null;
}

function tileHasToken(tile) {
    return tile.hasChildNodes();
}

function setCurrentPlayerDisplay(player) {
    currentPlayerDisplay.innerHTML = ("<strong>" + player + "'s Turn" + "</strong>");
}

main();
