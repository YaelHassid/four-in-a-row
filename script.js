// Define constants for the game
const ROWS = 7;
const COLS = 7;
const WINNING_LENGTH = 4;

// Define variables for the game
let board = [];
let currentPlayer = 1;
let winner = null;

// Get references to the HTML elements
const boardEl = document.querySelector('.board');
const playerTurnDisplay = document.querySelector('.player-turn-display');
const winnerDisplay = document.querySelector('.winner-display');
const playAgainButton = document.querySelector('.play-again-button');

// Create the game board
function createBoard() {
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = null;
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardEl.appendChild(cell);
    }
  }
}

// Update the display to reflect the current player's turn
function updatePlayerTurnDisplay() {
  playerTurnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  playerTurnDisplay.style.color = currentPlayer === 1 ? '#ff4136' : '#0074d9';
}

// Handle clicks on the game board cells
function handleCellClick(event) {
  if (winner !== null) {
    return;
  }
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  if (board[row][col] !== null) {
    return;
  }
  let lastEmptyRow = null;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      lastEmptyRow = r;
      break;
    }
  }
  if (lastEmptyRow === null) {
    return;
  }
  board[lastEmptyRow][col] = currentPlayer;
  const cell = document.querySelector(`[data-row="${lastEmptyRow}"][data-col="${col}"]`);
  cell.classList.add('filled', `player${currentPlayer}`);
  checkForWinner(lastEmptyRow, col);
  if (winner === null) {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerTurnDisplay();
  }
}

// Check if the most recent move resulted in a win
function checkForWinner(row, col) {
  // Check for horizontal win
  let count = 0;
  for (let c = 0; c < COLS; c++) {
    if (board[row][c] === currentPlayer) {
      count++;
    } else {
      count = 0;
    }
    if (count === WINNING_LENGTH) {
      winner = currentPlayer;
      break;
    }
  }
  if (winner !== null) {
    displayWinner();
    return;
  }
  // Check for vertical win
  count = 0;
  for (let r = 0; r < ROWS; r++) {
    if (board[r][col] === currentPlayer) {
      count++;
    } else {
      count = 0;
    }
    if (count === WINNING_LENGTH) {
      winner = currentPlayer;
      break;
    }
  }
  if (winner !== null) {
    displayWinner();
    return;
  }
  // Check for diagonal win (top-left to bottom-right)
  count = 0;
  let offset = Math.min(row, col);
  let r = row - offset;
// Note: There are 2 loops in this block of code.
for (let c = col - offset, r = row - offset; c < COLS && r < ROWS; c++, r++) {
    if (board[r][c] === currentPlayer) {
    count++;
    } else {
    count = 0;
    }
    if (count === WINNING_LENGTH) {
    winner = currentPlayer;
    break;
    }
    }
    if (winner !== null) {
    displayWinner();
    return;
    }
    // Check for diagonal win (top-right to bottom-left)
    count = 0;
    offset = Math.min(row, COLS - col - 1);
    for (let c = col + offset, r = row - offset; c >= 0 && r < ROWS; c--, r++) {
    if (board[r][c] === currentPlayer) {
    count++;
    } else {
    count = 0;
    }
    if (count === WINNING_LENGTH) {
    winner = currentPlayer;
    break;
    }
    }
    if (winner !== null) {
    displayWinner();
    return;
    }
    // Check for tie
    let tie = true;
    for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
    if (board[r][c] === null) {
    tie = false;
    break;
    }
    }
    if (!tie) {
    break;
    }
    }
    if (tie) {
    winner = 'tie';
    displayWinner();
    }
    }
    
    // Display the winner of the game
    function displayWinner() {
    if (winner === 'tie') {
    winnerDisplay.textContent = 'Its a tie!';
    winnerDisplay.style.color = '#111';
    } else {
    winnerDisplay.textContent = "Player ${winner} wins";
    winnerDisplay.style.color = winner === 1 ? '#ff4136' : '#0074d9';
    }
    playAgainButton.classList.add('show');
    }
    
    // Reset the game
    function resetGame() {
    boardEl.innerHTML = '';
    board = [];
    currentPlayer = 1;
    winner = null;
    createBoard();
    updatePlayerTurnDisplay();
    winnerDisplay.textContent = '';
    playAgainButton.classList.remove('show');
    }
    
    // Initialize the game
    createBoard();
    updatePlayerTurnDisplay();
    
    // Add event listener to the "Play Again" button
    playAgainButton.addEventListener('click', resetGame);