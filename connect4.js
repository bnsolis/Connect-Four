
// NOTE (bsolis): Standard height/width of a connect 4 board.
const WIDTH = 7;
const HEIGHT = 6;

// NOTE (bsolis): currPlayer = 1 will switch based on active player.
let currPlayer = 1; 
// NOTE (bsolis): board will be created as an array.
let board = []; 

// NOTE (bsolis):  makeboard creates the board.
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    // NOTE (bsolis): pushes array into board variable.
    board.push(Array.from({ length: WIDTH }));
  }
}

// NOTE (bsolis): makeHtmlBoard makes HTML table and row of column tops.
function makeHtmlBoard() {
  const board = document.getElementById('board');

  // NOTE (bsolis):  Creating top column.
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  // NOTE (bsolis): Add listener for click on td.
  top.addEventListener('click', handleClick);

  // NOTE (bsolis): Loop creates tds and then appends to top tr.
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  // NOTE (bsolis): Append top column to board.
  board.append(top);

  // NOTE (bsolis): loop to create remaining rows.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    // NOTE (bsolis): Loop adds cells to new rows.
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    
    // NOTE (bsolis): Append new rows to board.
    board.append(row);
  }
}

// NOTE (bsolis): This code checks to see if there is a piece already existing within a cell on my board.
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

// NOTE (bsolis): This function creates a new piece in table
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

// NOTE (bsolis): Displays end of game alert message
function endGame(msg) {
  alert(msg);
}

// NOTE (bsolis):  When a top button is clicked, check for a spot and place piece in board.
function handleClick(evt) {
  const x = +evt.target.id;

  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}

// NOTE (bsolis):  Checks for a win horizontally, vertically, and diagonally.
function checkForWin() {
  function _win(cells) {

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], 
      [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
