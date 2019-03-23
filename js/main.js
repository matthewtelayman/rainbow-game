const boardContainer = document.getElementById('board-container');

/*
bind to container
create 10 divs that fit inside container
repeat 10 times. use some kind of float or flex.
attach an id to each square
apply styles to squares + on selection.
*/

//Create board
const tableBody = document.getElementById('table-body')
let counter = 0

//TODO: calculate td height get width of td, use that value to set padding-bottom.
const tableWidth = tableBody.getAttribute('width')
for (let i = 0; i < 10; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 10; j++) {
        let td = document.createElement('td');
        td.setAttribute("style", "padding-bottom:53px; border:2px solid black; ");
        td.id = `tile-${counter}`;
        tr.appendChild(td);
        counter++;
    }
    tableBody.appendChild(tr);
}

//Add highlight action to board tiles
for (let i = 0; i < 100; i++) {
    let tile = document.getElementById(`tile-${i}`);
    tile.addEventListener('click', () => {
        console.log(`Selected tile with id ${i}`)
        tile.classList.toggle('select-tile')
    })
}