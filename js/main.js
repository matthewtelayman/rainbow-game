import {
    chooseRandom,
    checkMoveIsWithinRange
} from './utils.js'
import anime from './anime.es.js';

//Global vars //TODO: remove them
let globalSelectCheck = false

//Create board
class Board {
    tokenColors = []
    numOfCols = 0
    numOfRows = 0
    tableBody = document.getElementById('table-body')

    constructor(tokenColors, numOfRows, numOfCols) {
        this.tokenColors = tokenColors
        this.numOfRows = numOfRows
        this.numOfCols = numOfCols
    }
    createBoard() {
        let counter = 0
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
        const boardSize = this.numOfCols * this.numOfRows
        this.placeTokens(this.tokenColors, boardSize)
        this.activateBoard()
    }
    placeTokens(tokenColors, boardSize) {
        for (let i = 0; i < boardSize; i++) {
            if (i != 44 && i != 45 && i != 54 && i != 55) {
                let tile = document.getElementById(`tile-${i}`);
                let token = document.createElement('div')
                token.id = `token-${i}`
                const randomColor = chooseRandom(tokenColors)
                token.className = `${randomColor} token`
                tile.append(token)
            }
        }
    }
    activateBoard() {
        let selectedToken
        for (let i = 0; i < 100; i++) {
            let tile = document.getElementById(`tile-${i}`);
            tile.addEventListener('click', () => {

                //valid token selections
                const userSelectsToken = tile.classList != 'select-token' && globalSelectCheck == false
                const userUnselectsToken = tile.classList == 'select-token' && globalSelectCheck == true
                const userWantsToMoveToken = tile.classList != 'select-token' && globalSelectCheck == true

                if (userSelectsToken) {
                    console.log(`Selected token with id ${i}`)
                    tile.classList = 'select-token'
                    selectedToken = i
                    globalSelectCheck = true;

                } else if (userUnselectsToken) {
                    tile.classList = ''
                    globalSelectCheck = false;

                } else if (userWantsToMoveToken) {
                    if (checkMoveIsWithinRange(i, selectedToken)) {
                        if (validMove) {
                            moveToken(i, selectedToken)
                        }
                    } else {
                        alert('Please choose a tile within range')
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
            })
        }
    }
}


export const validMove = (tileToMove, selectedToken) => {}

const moveToken = (tileToMove, selectedToken) => {

}

const tokenColors = ['red', 'green', 'yellow', 'blue', 'orange'];
const board = new Board(tokenColors, 10, 10)
board.createBoard()