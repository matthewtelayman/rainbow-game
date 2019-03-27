import {
    chooseRandom,
    checkMoveIsWithinRange
} from './utils.js';
import anime from './anime.es.js';
import Token from './token.js';

//Global vars //TODO: remove them
let globalSelectCheck = false;
let token = new Token;
let selectedTile;

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
        this.setTileSelectionListener();
        this.setTokenSelectionListener();
    }

    setTileSelectionListener() {
        for (let i = 0; i < 100; i++) {
            let tile = document.getElementById(`tile-${i}`);
            tile.addEventListener('click', () => {
                selectedTile = tile.id;
                console.log(selectedTile);
            });
        }
    }

    setTokenSelectionListener() {
        for (let i = 0; i < 100; i++) {

            if (Board.isNotMiddleFourTiles(i)) {
                let currentToken = document.getElementById(`token-${i}`);
                currentToken.addEventListener('click', () => {
                    //valid token selections
                    const userSelectsToken = token.getCurrentlySelectedToken() != currentToken && globalSelectCheck === false;
                    const userUnselectsToken = token.getCurrentlySelectedToken() == currentToken && globalSelectCheck === true;
                    const userWantsToMoveToken = token.getCurrentlySelectedToken() != currentToken && globalSelectCheck === true;
                    if (userSelectsToken) {
                        console.log(`Selected token with id ${i}`);
                        currentToken.classList.toggle('select-token');
                        token.setCurrentlySelectedToken(currentToken);
                        globalSelectCheck = true;
                    } else if (userUnselectsToken) {
                        currentToken.classList.toggle('select-token');
                        token.setCurrentlySelectedToken('');
                        globalSelectCheck = false;
                    } else if (userWantsToMoveToken) {
                        if (checkMoveIsWithinRange(i, token.getCurrentlySelectedToken())) {
                            if (validMove) {
                                currentToken.classList.toggle('select-token');
                                moveToken(i, token.getCurrentlySelectedToken());
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
}

export const validMove = (tileToMove, selectedToken) => {
};

const moveToken = (tileToMove, selectedToken) => {


};

const board = new Board(10, 10);
board.createBoard();