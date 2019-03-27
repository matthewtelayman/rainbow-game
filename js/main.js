import {
    chooseRandom,
    checkMoveIsWithinRange
} from './utils.js'
import anime from './anime.es.js';
import Token from './token.js';
import {
    showUsernameModal
} from './chat.js'

//Global vars //TODO: remove them
let globalSelectCheck = false;
let token = new Token;

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

        if (token.colorHasMoreThanZeroTokens(randomColor)) {
            token.removeTokenFromPool(randomColor);
            return randomColor;
        } else {
            return this.getRandomColor();
        }
    }

    activateBoard() {
        let selectedToken;
        for (let i = 0; i < 100; i++) {
            let tile = document.getElementById(`tile-${i}`);
            tile.addEventListener('click', () => {

                //valid token selections
                const userSelectsToken = tile.classList != 'select-token' && globalSelectCheck == false
                const userUnselectsToken = tile.classList == 'select-token' && globalSelectCheck == true
                const userWantsToMoveToken = tile.classList != 'select-token' && globalSelectCheck == true

                if (userSelectsToken) {
                    console.log(`Selected token with id ${i}`);
                    tile.classList = 'select-token';
                    selectedToken = i;
                    globalSelectCheck = true;

                } else if (userUnselectsToken) {
                    tile.classList = '';
                    globalSelectCheck = false;

                } else if (userWantsToMoveToken) {
                    if (checkMoveIsWithinRange(i, selectedToken)) {
                        if (validMove) {
                            moveToken(i, selectedToken)
                        }
                    } else {
                        alert('Please choose a tile within range');
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
                }
            });
        }
    }
}

export const validMove = (tileToMove, selectedToken) => {};

const moveToken = (placeToMove, selectedToken) => {
    const element = document.querySelector(`#token-${selectedToken}`)
    const tile = document.getElementById(`tile-${selectedToken}`)
    console.log('TOKEN ', element);
    console.log('TILE ', tile);
    tile.classList = ''
    let config = {
        targets: element
    }
    //Move down
    if (placeToMove === selectedToken + 10) {
        console.log(placeToMove)
        config.translateY = 63
        //Move up
    } else if (placeToMove === selectedToken - 10) {
        console.log(placeToMove)
        config.translateY = -63
        //Move right
    } else if (placeToMove === selectedToken + 1) {
        console.log(placeToMove)
        config.translateX = 63
        //Move left
    } else if (placeToMove === selectedToken - 1) {
        console.log(placeToMove)
        config.translateX = -63
        //Move diagonal down right
    } else if (placeToMove === selectedToken + 11) {

        //Move diagonal down left
    } else if (placeToMove === selectedToken - 11) {

        //Move diagonal up right
    } else if (placeToMove === selectedToken + 9) {

        //Move diagonal up left
    } else if (placeToMove === selectedToken - 9) {

    }
    globalSelectCheck = false;
    anime(config);
}



const board = new Board(10, 10);
board.createBoard();
showUsernameModal()