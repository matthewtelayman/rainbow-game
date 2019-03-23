//Elements
const boardContainer = document.getElementById('board-container');
const tableBody = document.getElementById('table-body')
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
        hexValue: '#00b894'
    },
    {
        color: 'yellow',
        hexValue: '#f9ca24'
    }
];

//Create board
let counter = 0
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

//Place tokens on board
/*
1.iterate over each tile.
2. randomly place one of four-colored tokens
3. exclude four middle tiles
*/

let token;
counter = 0;
for (let i = 0; i < 100; i++) {
    let tile = document.getElementById(`tile-${i}`);
    token = document.createElement('div')
    //randomize utility here
    token.id = `token-${counter}`
    token.className = 'red token'
    tile.append(token)
    counter++;
}

//Add highlight action to board tiles
for (let i = 0; i < 100; i++) {
    token = document.getElementById(`tile-${i}`);
    tile.addEventListener('click', () => {
        console.log(`Selected token with id ${i}`)
        token.classList.toggle('select-token')
    })
}