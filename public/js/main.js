import {
    chooseRandom,
    checkMoveIsWithinRange
} from './utils.js';
import anime from './anime.es.js';
import Token from './token.js';

//Global vars //TODO: remove them
let globalSelectCheck = false;
let selectedTile;
let tokens = [];
let selectingToken = false;

//Create board
class Board {
    numOfCols = 0;
    numOfRows = 0;
    tableBody = document.getElementById('table-body');

    constructor(numOfRows, numOfCols) {
        this.numOfRows = numOfRows;
        this.numOfCols = numOfCols;
    }

    createBoard() {
        let counter = 0;
        for (let i = 0; i < this.numOfRows; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < this.numOfCols; j++) {
                let td = document.createElement('td');
                td.id = `tile-${counter}`;
                tr.appendChild(td);
                counter++;
            }
            this.tableBody.appendChild(tr);
        }
        const boardSize = this.numOfCols * this.numOfRows;
        this.placeTokens(Token.getTokenColors(), boardSize);
        this.activateBoard();
    }

    placeTokens(tokenColors, boardSize) {
        for (let i = 0; i < boardSize; i++) {
            if (Board.isNotMiddleFourTiles(i)) {
                let tile = document.getElementById(`tile-${i}`);
                let token = document.createElement('div');
                token.id = `token-${i}`;
                const randomColor = this.getRandomColor();
                token.className = `${randomColor} token`;
                tile.appendChild(token);
            }
        }
    }

    static isNotMiddleFourTiles(index) {
        return index !== 44 && index !== 45 && index !== 54 && index !== 55;
    }

    getRandomColor() {
        const randomColor = chooseRandom(Token.getTokenColors());

        if (Token.colorHasMoreThanZeroTokens(randomColor)) {
            Token.removeTokenFromPool(randomColor);
            return randomColor;
        } else {
            return this.getRandomColor();
        }
    }

    activateBoard() {
        this.setTileSelectionListener();
        this.setTokenSelectionListener();
    }

    setTileSelectionListener() {
        for (let i = 0; i < 100; i++) {
            let tile = document.getElementById(`tile-${i}`);

            tile.onclick = function(event)
            {
               if (event.target === this)
               {
                   let userWantsToMoveToken;
                   let currentToken;
                   selectedTile = i;

                   if (Token.getCurrentlySelectedToken() !== undefined) {
                       currentToken = tokens.find(function (element) {
                           return element.getTokenId() === Token.getCurrentlySelectedToken().getTokenId();
                       });
                   }

                   if (currentToken !== undefined) {
                       /*Tokens sit on top of their original tiles so tokenId matches the tile they sit on. If a different tile
                       * is clicked, that tile will be different than the token Id UNLESS it is the tokens original tile. In that case,
                       * we know the user is moving because the currentTokens currentTile is different than the home tile and also
                       * the currentToken's ID is the same as the selected tile, meaning the tile and token have the same IDs, but the token
                       * is sitting in a different location*/
                       userWantsToMoveToken = (currentToken.getTokenId() !== selectedTile && globalSelectCheck === true) || (currentToken.getCurrentTile() !== currentToken.getTokenId() && currentToken.getTokenId() === selectedTile && globalSelectCheck === true);
                   } else {
                       userWantsToMoveToken = false;
                   }


                   console.log(selectedTile);
                   if (userWantsToMoveToken) {
                       console.log("Move token");
                       if (checkMoveIsWithinRange(selectedTile, currentToken.getCurrentTile())) {
                           if (validMove) {
                               document.getElementById(currentToken.getTokenElementId()).classList.toggle('select-token');
                               moveToken(selectedTile, currentToken);
                               currentToken.setCurrentTile(selectedTile);
                           }
                       } else {
                           alert('Please choose a tile within range');
                       }
                   }
               }

            };



        }
    }



    setTokenSelectionListener() {
        for (let i = 0; i < 100; i++) {

            if (Board.isNotMiddleFourTiles(i)) {
                let currentToken = document.getElementById(`token-${i}`);

                let token = new Token(i, `token-${i}`, i);
                tokens.push(token);

                currentToken.addEventListener('click', () => {
                    const userSelectsToken = Token.getCurrentlySelectedToken() !== currentToken && globalSelectCheck === false;
                    const userUnselectsToken = Token.getCurrentlySelectedToken() === token && globalSelectCheck === true;
                    if (userSelectsToken) {
                        console.log(`Selected token with id ${i}`);
                        currentToken.classList.toggle('select-token');
                        Token.setCurrentlySelectedToken(token);
                        globalSelectCheck = true;
                    } else if (userUnselectsToken) {
                        console.log("Unselects token");
                        currentToken.classList.toggle('select-token');
                        Token.setCurrentlySelectedToken(undefined);
                        globalSelectCheck = false;
                    }
                });
            }

        }

    }
}


export const validMove = (tileToMove, selectedToken) => {
};

const moveToken = (placeToMove, selectedToken) => {

    let currentToken = tokens.find(function (element) {
        return element.getTokenId() === selectedToken.getTokenId();
    });

    let tokenId = currentToken.getTokenId();
    let currentTokenPosition = currentToken.getCurrentTile();

    const element = document.getElementById(`token-${tokenId}`);
    const tile = document.getElementById(`tile-${placeToMove}`);
    console.log('TOKEN ', element);
    console.log('TILE ', tile);

    let config = {
        targets: element
    };
    //Move down
    if (placeToMove === currentTokenPosition + 10) {
        console.log(placeToMove);
        config.translateY = currentToken.getCurrentTransformYAmount() + 65;
        currentToken.setCurrentTransformYAmount(config.translateY);

        //Move up
    } else if (placeToMove === currentTokenPosition - 10) {
        console.log(placeToMove);
        config.translateY = currentToken.getCurrentTransformYAmount() - 65;
        currentToken.setCurrentTransformYAmount(config.translateY);
        //Move right
    } else if (placeToMove === currentTokenPosition + 1) {
        console.log(placeToMove);
        config.translateX = currentToken.getCurrentTransformXAmount() + 65;
        currentToken.setCurrentTransformXAmount(config.translateX);
        //Move left
    } else if (placeToMove === currentTokenPosition - 1) {
        console.log(placeToMove);
        config.translateX = currentToken.getCurrentTransformXAmount() - 65;
        currentToken.setCurrentTransformXAmount(config.translateX);
        //Move diagonal down right
    } else if (placeToMove === currentTokenPosition + 11) {

        //Move diagonal down left
    } else if (placeToMove === currentTokenPosition - 11) {

        //Move diagonal up right
    } else if (placeToMove === currentTokenPosition + 9) {

        //Move diagonal up left
    } else if (placeToMove === currentTokenPosition - 9) {

    }
    globalSelectCheck = false;
    anime(config);
};


const board = new Board(10, 10);
board.createBoard();