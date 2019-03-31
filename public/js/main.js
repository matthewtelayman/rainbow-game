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
                tile.append(token);
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
            tile.addEventListener('click', () => {

                let userWantsToMoveToken;
                if (Token.getCurrentlySelectedToken() !== undefined) {
                    userWantsToMoveToken = Token.getCurrentlySelectedToken().getTokenId() !== i && globalSelectCheck === true;
                } else {
                    userWantsToMoveToken = false;
                }
                selectedTile = i;
                console.log(selectedTile);

                if (userWantsToMoveToken) {
                    console.log("Move token");
                    if (checkMoveIsWithinRange(selectedTile, Token.getCurrentlySelectedToken().getCurrentTile())) {
                        if (validMove) {
                            document.getElementById(Token.getCurrentlySelectedToken().getTokenElementId()).classList.toggle('select-token');
                            moveToken(selectedTile, Token.getCurrentlySelectedToken());
                            Token.getCurrentlySelectedToken().setCurrentTile(selectedTile);
                        }
                    } else {
                        alert('Please choose a tile within range');
                    }
                }
            });
        }
    }

    setTokenSelectionListener() {
        for (let i = 0; i < 100; i++) {

            if (Board.isNotMiddleFourTiles(i)) {
                let currentToken = document.getElementById(`token-${i}`);

                let token = new Token(i, `token-${i}`, i);
                tokens.push(token);

                currentToken.addEventListener('click', () => {
                    //valid token selections


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
                    //check within range
                    //valid move
                    //eating piece
                    //solid move
                    //invalid move
                    //there is a piece already there that cannot be eaten
                    // const isOccupied = tile.firstChild
                    // if (isOccupied) {
                    //     console.log('cannot move')
                    // } else {
                    //     console.log('valid move')
                    // }

                });
            }

        }

    }
}


export const validMove = (tileToMove, selectedToken) => {
};

const moveToken = (placeToMove, selectedToken) => {

    let tokenId = selectedToken.getTokenId();
    let currentTokenPosition = selectedToken.getCurrentTile();

    const element = document.getElementById(`token-${tokenId}`);
    const tile = document.getElementById(`tile-${placeToMove}`);
    console.log('TOKEN ', element);
    console.log('TILE ', tile);
    tile.classList = '';
    let config = {
        targets: element
    };
    //Move down
    if (placeToMove === currentTokenPosition + 10) {
        console.log(placeToMove);
        config.translateY = 65;
        //Move up
    } else if (placeToMove === currentTokenPosition - 10) {
        console.log(placeToMove);
        config.translateY = -65;
        //Move right
    } else if (placeToMove === currentTokenPosition + 1) {
        console.log(placeToMove);
        config.translateX = 65;
        //Move left
    } else if (placeToMove === currentTokenPosition - 1) {
        console.log(placeToMove);
        config.translateX = -65;
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