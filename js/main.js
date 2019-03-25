//Elements
const tokenColors = ['red', 'green', 'yellow', 'blue', 'orange'];
let counter = 0;
let globalSelectCheck = false

//Utilities
const chooseRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

//Create board
class Board {

    tokenColors = []
    numOfCols = 0
    numOfRows = 0
    counter = 0
    tableBody = document.getElementById('table-body')

    constructor(tokenColors, numOfRows, numOfCols) {
        this.tokenColors = tokenColors
        this.numOfRows = numOfRows
        this.numOfCols = numOfCols
    }

    createBoard() {
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
}

class Token extends Board {
    constructor() {
        super()
    }
    addTokenSelection() {
        for (let i = 0; i < 100; i++) {
            let token = document.getElementById(`tile-${i}`);
            token.addEventListener('click', () => {
                if (token.classList != 'select-token' && globalSelectCheck == false) {
                    console.log(`Selected token with id ${i}`)
                    token.classList = 'select-token'
                    globalSelectCheck = true;
                } else if (token.classList == 'select-token' && globalSelectCheck == true) {
                    token.classList = ''
                    globalSelectCheck = false;
                }
            })
        }
    }
    addTokenValidation() {
        //check if you can make a move.
    }
}

const board = new Board(tokenColors, 10, 10)
const token = new Token();
//an init sequence must take place.
board.createBoard()
//add token actions
token.addTokenSelection()