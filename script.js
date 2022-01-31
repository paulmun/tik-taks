let board = [];
let currentTurn = 0;
let squareElements = [];

const boardElement = document.querySelector('#board');
const resetElement = document.querySelector('#reset');
const playerElement = document.querySelector('#currentTurn');
const winnerElement = document.querySelector('#winner');
const warningElement = document.querySelector('#warning');

function generateBoard() {
  for(let i = 0; i < 3; i++) {
    board[i] = [0, 0 ,0];
  }
}

function resetGame() {
  boardElement.innerHTML = '';
  playerElement.innerHTML = 'Player 1';
  winnerElement.innerHTML = '';
  warningElement.innerHTML = '';

  board = [];
  squareElements = [];
  currentTurn = 0;
  
  generateBoard();
  drawBoard();
}

function drawBoard() {
  for(let i = 0; i < board.length; i++) {
    const row = document.createElement('div');
    const rowElements = [];

    row.classList.add('row');
    
    for (let j = 0; j < board[0].length; j++) {
      const square = document.createElement('span');

      square.classList.add(`row-${i + 1}`);
      square.classList.add(`column-${j + 1}`);
      square.addEventListener('click', () => makeMove(i, j));

      rowElements.push(square);
      row.append(square);
    }

    squareElements.push(rowElements);
    boardElement.append(row);
  }
}

function makeMove(row, col) {
  let player = (currentTurn % 2) + 1;

  clearWarning();

  if (!board[row][col]) {
    if (player === 1) {
      board[row][col] = 1;
      squareElements[row][col].innerHTML = 'X';
    } else {
      board[row][col] = 2;
      squareElements[row][col].innerHTML = 'O';
    }

    if (currentTurn > 3) {
      checkForWin();
    }

    currentTurn++;
    playerElement.innerHTML = `Player ${player}`;
  } else {
    setWarning('This spot is already taken!');
  }

  // If all squares are filled and there's no winner, it's a tie.
  if (currentTurn === 9 && checkForWin() === 0) {
    endGame(0);
  }
}

// You could make this smarter to check for tie scenarios once a certain number of moves are made.
function checkForWin() {
  for (let i = 0 ; i < board.length; i++) {
    // checking rows for wins
    if (board[i][0] !== 0) {
      if (board[i].every((val, s, arr) => val === arr[0])) {
        return endGame(board[i][0]);
      }
    }
  }

  // checking columns for wins
  for (let j = 0; j < board.length; j++) {
    if (board[0][j] !== 0) {
      if (board[1][j] === board[0][j] && board[2][j] === board[0][j]) {
        return endGame(board[0][j]);
      }
    }
  }

  // check for diagonal wins
  if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return endGame(board[0][0]);
  }

  if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return endGame(board[0][2]);
  }

  return 0;
}

function endGame(winner) {
  if (winner === 0) {
    winnerElement.innerHTML = 'Tie Game!';
  } else {
    winnerElement.innerHTML = `Player ${winner} Wins!`;
  }
}

function setWarning(warning) {
  warningElement.innerHTML = warning;
}

function clearWarning() {
  warningElement.innerHTML = '';
}

resetGame();
resetElement.addEventListener('click', resetGame);
